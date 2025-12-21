"""------------------IMPORT PACKAGES--------------------"""
import matplotlib.pyplot as plt
import pandas as pd
import csv
import numpy as np
import os
import requests
from io import StringIO
import pymc as pm
import arviz as az
from tqdm import tqdm
import hssm
import random
from hssm.distribution_utils import make_distribution
from hssm.likelihoods import DDM
from scipy.stats import pearsonr
import pytensor.tensor as pt
from pytensor.scan import scan
from joblib import Parallel, delayed

"""------------------SET VARIABLES--------------------"""

n_indi_param_sets = 21 
n_group_param_sets = 30
num_draws = 4000
num_tune = 4000
targ_accept = 0.9
fixed_ndt = 0.25
EPS = 1e-6 #epsilon
wald_prior_class = "log_normal_prior_centered"

print("Wald model prior: " + wald_prior_class)
print("Targ accept: "+str(targ_accept))
print("Draws: "+str(num_draws))
print("Tunes: "+str(num_tune))

"""------------------IMPORT SYNTHETIC DATA--------------------"""
df_synthetic_data = pd.read_csv(f"synthetic_data/synthetic_data_{wald_prior_class}.csv")

"""------------------HELPER FUNCTIONS--------------------"""
def flatten(xss):
    return [x for xs in xss for x in xs]

"""------------------FITTING FUNCTIONS--------------------"""
def fit_group_synthetic_data_lognormal_prior(g):

    wm_name = f"h_wm_group{g}"
    ddm_name = f"ddm_group{g}"

    df_group_synthetic_data = df_synthetic_data[
        df_synthetic_data['group_parameter_set_ID'] == g
    ]

    # Format data for fitting  procedure
    rt  = df_group_synthetic_data['rt'].to_numpy(float)
    wt  = df_group_synthetic_data['wt'].to_numpy(float)
    rep = df_group_synthetic_data['repro_t'].to_numpy(float)
    subj_idx = df_group_synthetic_data['synthetic_par_ID'].to_numpy(int)

    n_obs  = rt.size
    n_subj = len(subj_idx)

    # ----- prepare observed decision time outside the model -----
    #dec_time_np = np.maximum(rep - fixed_ndt, EPS).astype(float)

    coords = {
        "subject": np.arange(n_subj),
        "obs": np.arange(rt.size),
    }

    with pm.Model(coords=coords, name=wm_name) as model: 
        # ----- data  -----
        rt_dat   = pm.Data("rt", rt, dims="obs")
        wt_dat   = pm.Data("wt", wt, dims="obs")
        subj_dat = pm.Data("subj_idx", subj_idx.astype(int), dims="obs")
        #dec_dat  = pm.Data("dec_time", dec_time_np, dims="obs")
    
        # ===== group-level priors on log scale =====
    
        group_log_beta0_mu, group_log_beta0_sigma = pm.Normal("group_log_beta0_mu", 0, 0.5), pm.HalfNormal("group_log_beta0_sigma", 0.5)
        group_log_beta1_mu, group_log_beta1_sigma = pm.Normal("group_log_beta1_mu", 0, 0.5), pm.HalfNormal("group_log_beta1_sigma", 0.5)
        group_log_beta2_mu, group_log_beta2_sigma = pm.Normal("group_log_beta2_mu", 0, 0.5), pm.HalfNormal("group_log_beta2_sigma", 0.5)
    
        group_log_drift_mu    = pm.Normal("group_log_drift_mu", 0.5, 0.5)
        group_log_drift_sigma = pm.HalfNormal("group_log_drift_sigma", 0.5)

        if wald_prior_class == "log_normal_prior_centered":    
    
            # ===== individual-level parameters  =====
            indi_log_beta0 = pm.Normal("indi_log_beta0", mu=group_log_beta0_mu, sigma=group_log_beta0_sigma, dims="subject")
            indi_log_beta1 = pm.Normal("indi_log_beta1", mu=group_log_beta1_mu, sigma=group_log_beta1_sigma, dims="subject")
            indi_log_beta2 = pm.Normal("indi_log_beta2", mu=group_log_beta2_mu, sigma=group_log_beta2_sigma, dims="subject")
            indi_log_drift = pm.Normal("indi_log_drift", mu=group_log_drift_mu, sigma=group_log_drift_sigma, dims="subject")

        elif wald_prior_class == "log_normal_prior_non_centered":   
            # ===== individual-level parameters (NON-CENTERED) =====
            z_b0 = pm.Normal("z_b0", 0.0, 1.0, dims="subject")
            z_b1 = pm.Normal("z_b1", 0.0, 1.0, dims="subject")
            z_b2 = pm.Normal("z_b2", 0.0, 1.0, dims="subject")
            z_d  = pm.Normal("z_drift", 0.0, 1.0, dims="subject")
        
            indi_log_beta0 = pm.Deterministic("indi_log_beta0", group_log_beta0_mu + group_log_beta0_sigma * z_b0, dims="subject")
            indi_log_beta1 = pm.Deterministic("indi_log_beta1", group_log_beta1_mu + group_log_beta1_sigma * z_b1, dims="subject")
            indi_log_beta2 = pm.Deterministic("indi_log_beta2", group_log_beta2_mu + group_log_beta2_sigma * z_b2, dims="subject")
            indi_log_drift = pm.Deterministic("indi_log_drift", group_log_drift_mu + group_log_drift_sigma * z_d,  dims="subject")
        
        indi_beta0 = pm.Deterministic("indi_beta0", pt.exp(indi_log_beta0), dims="subject")
        indi_beta1 = pm.Deterministic("indi_beta1", pt.exp(indi_log_beta1), dims="subject")
        indi_beta2 = pm.Deterministic("indi_beta2", pt.exp(indi_log_beta2), dims="subject")
        indi_drift = pm.Deterministic("indi_drift", pt.exp(indi_log_drift), dims="subject")


                
        # ===== trial-level link =====
        i = pm.intX(subj_dat)  # map each trial to its subject
        
        alpha_n   = pm.Deterministic(
            "alpha_n",
            indi_beta0[i] + indi_beta1[i]*rt_dat + indi_beta2[i]*wt_dat,
            dims="obs"
        )
    
        mu_n  = alpha_n / (indi_drift[i] + 1e-9) 
        lam_n = alpha_n**2
    
        # ===== likelihood (observed must be raw data) =====
        pm.Wald("reproduced_times", mu=mu_n, lam=lam_n, alpha = fixed_ndt, observed=rep, dims="obs")
    
        # ===== sampling =====
        idata_wald = pm.sample(
            draws=num_draws,
            tune=num_tune,
            target_accept=targ_accept,
            chains=4,
            cores=4,
            return_inferencedata=True,
            idata_kwargs={"log_likelihood": True},
        )
        ppc_wald = pm.sample_posterior_predictive(idata_wald, var_names=["reproduced_times","alpha_n"])
   


    wald_fitting_summary = az.summary(idata_wald)

    # Record group-level parameters
    group_recovered_params = {
        'group_parameter_set_ID': g,
    
        'recovered_group_log_beta0_mu_mean': wald_fitting_summary.loc[f'{wm_name}::group_log_beta0_mu']['mean'],
        'recovered_group_log_beta0_mu_sd': wald_fitting_summary.loc[f'{wm_name}::group_log_beta0_mu']['sd'],
        'recovered_group_log_beta0_mu_hdi_3': wald_fitting_summary.loc[f'{wm_name}::group_log_beta0_mu']['hdi_3%'],
        'recovered_group_log_beta0_mu_hdi_97': wald_fitting_summary.loc[f'{wm_name}::group_log_beta0_mu']['hdi_97%'],
        
        'recovered_group_log_beta0_sigma_mean': wald_fitting_summary.loc[f'{wm_name}::group_log_beta0_sigma']['mean'],
        'recovered_group_log_beta0_sigma_sd': wald_fitting_summary.loc[f'{wm_name}::group_log_beta0_sigma']['sd'],
        'recovered_group_log_beta0_sigma_hdi_3': wald_fitting_summary.loc[f'{wm_name}::group_log_beta0_sigma']['hdi_3%'],
        'recovered_group_log_beta0_sigma_hdi_97': wald_fitting_summary.loc[f'{wm_name}::group_log_beta0_sigma']['hdi_97%'],
        
        'recovered_group_log_beta1_mu_mean': wald_fitting_summary.loc[f'{wm_name}::group_log_beta1_mu']['mean'],
        'recovered_group_log_beta1_mu_sd': wald_fitting_summary.loc[f'{wm_name}::group_log_beta1_mu']['sd'],
        'recovered_group_log_beta1_mu_hdi_3': wald_fitting_summary.loc[f'{wm_name}::group_log_beta1_mu']['hdi_3%'],
        'recovered_group_log_beta1_mu_hdi_97': wald_fitting_summary.loc[f'{wm_name}::group_log_beta1_mu']['hdi_97%'],
        
        'recovered_group_log_beta1_sigma_mean': wald_fitting_summary.loc[f'{wm_name}::group_log_beta1_sigma']['mean'],
        'recovered_group_log_beta1_sigma_sd': wald_fitting_summary.loc[f'{wm_name}::group_log_beta1_sigma']['sd'],
        'recovered_group_log_beta1_sigma_hdi_3': wald_fitting_summary.loc[f'{wm_name}::group_log_beta1_sigma']['hdi_3%'],
        'recovered_group_log_beta1_sigma_hdi_97': wald_fitting_summary.loc[f'{wm_name}::group_log_beta1_sigma']['hdi_97%'],

        'recovered_group_log_beta2_mu_mean': wald_fitting_summary.loc[f'{wm_name}::group_log_beta2_mu']['mean'],
        'recovered_group_log_beta2_mu_sd': wald_fitting_summary.loc[f'{wm_name}::group_log_beta2_mu']['sd'],
        'recovered_group_log_beta2_mu_hdi_3': wald_fitting_summary.loc[f'{wm_name}::group_log_beta2_mu']['hdi_3%'],
        'recovered_group_log_beta2_mu_hdi_97': wald_fitting_summary.loc[f'{wm_name}::group_log_beta2_mu']['hdi_97%'],
        
        'recovered_group_log_beta2_sigma_mean': wald_fitting_summary.loc[f'{wm_name}::group_log_beta2_sigma']['mean'],
        'recovered_group_log_beta2_sigma_sd': wald_fitting_summary.loc[f'{wm_name}::group_log_beta2_sigma']['sd'],
        'recovered_group_log_beta2_sigma_hdi_3': wald_fitting_summary.loc[f'{wm_name}::group_log_beta2_sigma']['hdi_3%'],
        'recovered_group_log_beta2_sigma_hdi_97': wald_fitting_summary.loc[f'{wm_name}::group_log_beta2_sigma']['hdi_97%'],

        'recovered_group_log_drift_mu_mean': wald_fitting_summary.loc[f'{wm_name}::group_log_drift_mu']['mean'],
        'recovered_group_log_drift_mu_sd': wald_fitting_summary.loc[f'{wm_name}::group_log_drift_mu']['sd'],
        'recovered_group_log_drift_mu_hdi_3': wald_fitting_summary.loc[f'{wm_name}::group_log_drift_mu']['hdi_3%'],
        'recovered_group_log_drift_mu_hdi_97': wald_fitting_summary.loc[f'{wm_name}::group_log_drift_mu']['hdi_97%'],
        
        'recovered_group_log_drift_sigma_mean': wald_fitting_summary.loc[f'{wm_name}::group_log_drift_sigma']['mean'],
        'recovered_group_log_drift_sigma_sd': wald_fitting_summary.loc[f'{wm_name}::group_log_drift_sigma']['sd'],
        'recovered_group_log_drift_sigma_hdi_3': wald_fitting_summary.loc[f'{wm_name}::group_log_drift_sigma']['hdi_3%'],
        'recovered_group_log_drift_sigma_hdi_97': wald_fitting_summary.loc[f'{wm_name}::group_log_drift_sigma']['hdi_97%'],
    }

    individual_level_params = []

    # Record individual-level parameters

    for i in range(n_indi_param_sets):
    
        df_row_beta0 = wald_fitting_summary.loc[f'{wm_name}::indi_beta0[{i}]']
        df_row_beta1 = wald_fitting_summary.loc[f'{wm_name}::indi_beta1[{i}]']
        df_row_beta2 = wald_fitting_summary.loc[f'{wm_name}::indi_beta2[{i}]']
        df_row_drift = wald_fitting_summary.loc[f'{wm_name}::indi_drift[{i}]']
    
        individual_level_params.append({
            'group_parameter_set_ID': g,
            'synthetic_par_ID': i,
            
            'recovered_indi_beta0_mean': df_row_beta0['mean'],
            'recovered_indi_beta0_sd': df_row_beta0['sd'],

            'recovered_indi_beta1_mean': df_row_beta1['mean'],
            'recovered_indi_beta1_sd': df_row_beta1['sd'],

            'recovered_indi_beta2_mean': df_row_beta2['mean'],
            'recovered_indi_beta2_sd': df_row_beta2['sd'],

            'recovered_indi_drift_mean': df_row_drift['mean'],
            'recovered_indi_drift_sd': df_row_drift['sd'],
        })
    
    return group_recovered_params, individual_level_params

# ----- run in parallel (returns a list of (group_dict, individual_list)) -----
group_recovered_params = [] 
individual_recovered_params = []

for g in tqdm(range(n_group_param_sets)):
    if wald_prior_class in ["log_normal_prior_centered","log_normal_prior_non_centered"]:
        group_recovery_result, individual_recovery_results = fit_group_synthetic_data_lognormal_prior(g)
    else:
        group_recovery_result, individual_recovery_results = fit_group_synthetic_data_gamma_priors(g)

    group_recovered_params.append(group_recovery_result)
    individual_recovered_params.append(individual_recovery_results)


# ----- save -----
individual_recovered_params = flatten(individual_recovered_params)

df_group_recovered_params = pd.DataFrame(group_recovered_params)
df_individual_recovered_params = pd.DataFrame(individual_recovered_params)

current_dir = os.getcwd()
out_dir = os.path.abspath(os.path.join(current_dir, "recovered_parameters"))
os.makedirs(out_dir, exist_ok=True)

file_path_group      = os.path.join(out_dir, f"group_recovered_params_{wald_prior_class}.csv")
file_path_individual = os.path.join(out_dir, f"individual_recovered_params_{wald_prior_class}.csv")

df_group_recovered_params.to_csv(file_path_group, index=False)
df_individual_recovered_params.to_csv(file_path_individual, index=False)

print("Saved:\n ", file_path_group, "\n ", file_path_individual)

