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
targ_accept = 0.99

wald_prior_class = "log_normal_prior_centered"

print("Wald model prior: " + wald_prior_class)
print("Targ accept: "+str(targ_accept))
print("Draws: "+str(num_draws))
print("Tunes: "+str(num_tune))

"""------------------IMPORT SYNTHETIC DATA--------------------"""
df_synthetic_data = pd.read_csv(f"synthetic_data/synthetic_data_{wald_prior_class}.csv")

synthetic_par_ids = np.unique(df_synthetic_data['synthetic_par_ID'].values)
synthetic_group_ids = np.unique(df_synthetic_data['group_parameter_set_ID'].values)

"""------------------HELPER FUNCTIONS--------------------"""
def flatten(xss):
    return [x for xs in xss for x in xs]

"""------------------FITTING FUNCTIONS--------------------"""
def FitSyntheticData(g, par):

    ddm_name = f"ddm_{g}_{par}"

    df_par_synthetic_data = df_synthetic_data[
        (df_synthetic_data['synthetic_par_ID'] == par) &
        (df_synthetic_data['group_parameter_set_ID'] == g)
    ]

    recovered_params = {}

    recovered_params['synthetic_par_ID'] = par
    recovered_params['group_parameter_set_ID'] = g

    diff_x = df_par_synthetic_data['diff_x'].values
    diff_p = df_par_synthetic_data['diff_p'].values
    diff_ev = df_par_synthetic_data['diff_ev'].values
    
    with pm.Model() as ddm_name:
        a = pm.Uniform("a", lower=0.5, upper=3.5)
        t = pm.HalfNormal("t", sigma = 0.3)
        v_diff_x = pm.HalfNormal("v_diff_x", sigma=3)
        v_diff_p = pm.HalfNormal("v_diff_p", sigma=3)
        v_diff_ev = pm.HalfNormal("v_diff_ev", sigma=3)

        v = v_diff_x*diff_x + v_diff_p*diff_p + v_diff_ev*diff_ev

        ddm = DDM(
            "DDM", v=v, a=a, z=0.5, t=t, 
            observed = df_par_synthetic_data[["rt", "response"]].values
        )
    
        ddm_trace = pm.sample(draws = num_draws, 
                               tune=num_tune, 
                               target_accept = targ_accept, 
                               return_inferencedata=True)

    recovered_params['recovered_a_mean'] = az.summary(ddm_trace)['mean']['a']
    recovered_params['recovered_a_std'] = az.summary(ddm_trace)['sd']['a']
    recovered_params['recovered_a_r_hat'] = az.summary(ddm_trace)['r_hat']['a']
    
    recovered_params['recovered_t_mean'] = az.summary(ddm_trace)['mean']['t']
    recovered_params['recovered_t_std']= az.summary(ddm_trace)['sd']['t']
    recovered_params['recovered_t_r_hat'] = az.summary(ddm_trace)['r_hat']['t']
        
    recovered_params['recovered_v_diff_p_mean'] = az.summary(ddm_trace)['mean']['v_diff_p']
    recovered_params['recovered_v_diff_p_std'] = az.summary(ddm_trace)['sd']['v_diff_p']
    recovered_params['recovered_v_diff_p_r_hat'] = az.summary(ddm_trace)['r_hat']['v_diff_p']
        
    recovered_params['recovered_v_diff_x_mean'] = az.summary(ddm_trace)['mean']['v_diff_x']
    recovered_params['recovered_v_diff_x_std'] = az.summary(ddm_trace)['sd']['v_diff_x']
    recovered_params['recovered_v_diff_x_r_hat'] = az.summary(ddm_trace)['r_hat']['v_diff_x']

    recovered_params['recovered_v_diff_ev_mean'] = az.summary(ddm_trace)['mean']['v_diff_ev']
    recovered_params['recovered_v_diff_ev_std'] = az.summary(ddm_trace)['sd']['v_diff_ev']
    recovered_params['recovered_v_diff_ev_r_hat'] = az.summary(ddm_trace)['r_hat']['v_diff_ev']

    return recovered_params

# ----- run in parallel (returns a list of (group_dict, individual_list)) -----
recovered_parameters = [] 
for g in tqdm(synthetic_group_ids):
    for par in synthetic_par_ids:
        recovery_result = FitSyntheticData(g,par)
        recovered_parameters.append(recovery_result)


# ----- save -----
df_parameter_recovery_results = pd.DataFrame(recovered_parameters)   
df_parameter_recovery_results.to_csv("recovered_parameters/ddm_recovered_parameters.csv", index=False)
