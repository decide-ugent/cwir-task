##----------------Load required libraries----------------------
library(httr)       
library(readr)      
library(dplyr)     
library(lme4)      
library(performance)  
library(see)
library(MuMIn)
library(ggplot2)
library(dplyr)
library(broom)

##----------------Download and format data----------------------

setwd("C:/Users/Administrator/OneDrive - UGent/Experiments/risky_dm/data_analysis/decision_making_models/PyMC/Hierarchical/data_analysis")

processed_path <- "../data_preprocessing/processed_data/processed_reproduction_task_data.csv"

df_processed_experiment_data <- tryCatch(
  {
    read_csv(processed_path)   # or read.csv(processed_path)
  },
  error = function(e) {
    message("File not found. Please run the preprocessing pipeline first to generate 'processed_reproduction_task_data.csv'.")
    stop(e)
  }
)

# Discard trials where the maxiumum pre-defined deadline was missed (RT>10s)
# and trials whee the full screen mode was exited
df_data <- df_processed_experiment_data  %>%
  filter(MissedMaxDeadline == 0 & FullScreenExited == 0)


#Format the data

data_formatted <- df_data %>%
  mutate(
    ParticipantID = as.factor(ParticipantID),  # Convert ParticipantID to a factor (equivalent to 'category' in pandas)
    TT = as.factor(GambleFinalDeadline),  # Convert Deadline to a factor
    log_ratio_RT_TT = log(ResponseTimeGamble / GambleFinalDeadline),  # Compute log_ratio_RT_TT
    log_djr = log(ReproducedTime / GambleFinalDeadline), # Compute log_djr
    repro_t = ReproducedTime,
    ratio_RT_TT = ResponseTimeGamble / GambleFinalDeadline,  # Compute log_ratio_RT_TT
    djr = ReproducedTime / GambleFinalDeadline, # Compute log_djr
  )

##----------------Fit models ----------------------

# Model with interaction and non-transformed dependent variable
m <- lmer(djr ~ ratio_RT_TT + TT + ratio_RT_TT*TT + (1 | ParticipantID), data = data_formatted)
summary(m)

# Model with no interaction and non-transformed dependent variable
m_no_interaction <- lmer(djr ~ ratio_RT_TT + TT  + (1 | ParticipantID), data = data_formatted)
summary(m_no_interaction)

# Model with interaction and transformed dependent variable
m_trans <- lmer(log_djr ~ ratio_RT_TT + TT + ratio_RT_TT*TT + (1 | ParticipantID), data = data_formatted)
summary(m_trans)

# Model with no interaction and transformed dependent variable 
# In the paper, this model is referred to as "lme2"
m_trans_no_interaction <- lmer(log_djr ~ ratio_RT_TT + TT  + (1 | ParticipantID), data = data_formatted)
summary(m_trans_no_interaction)

# Model with no interaction, transformed dependent variable and random slope
# In the paper, this model is referred to as "lme3"
m_trans_no_interaction_complex <- lmer(log_djr ~ ratio_RT_TT + TT + (1 + ratio_RT_TT | ParticipantID), data = data_formatted)
summary(m_trans_no_interaction_complex)


##----------------Model comparison ----------------------

AIC(m, m_no_interaction)

AIC(m_trans, m_trans_no_interaction,m_trans_no_interaction_complex)

##----------------Explained variance ----------------------


r2_values <- r.squaredGLMM(m)

print(r2_values)

r2_values_no_interaction <- r.squaredGLMM(m_no_interaction)

print(r2_values_no_interaction)

r2_values_trans <- r.squaredGLMM(m_trans)

print(r2_values_trans)

r2_values_trans_no_interaction <- r.squaredGLMM(m_trans_no_interaction)

print(r2_values_trans_no_interaction)

r2_values_trans_no_interaction_complex <- r.squaredGLMM(m_trans_no_interaction_complex)

print(r2_values_trans_no_interaction_complex)

##----------------Model diagnostics ----------------------

performance::check_model(m)

performance::check_model(m_no_interaction)

performance::check_model(m_trans)

performance::check_model(m_trans_no_interaction)

performance::check_model(m_trans_no_interaction_complex)


##----------------Trend visualization ----------------------


## Get slopes from each participant from complex model:

coef_part <- coef(m_trans_no_interaction_complex)$ParticipantID   # includes fixed + random parts

coef_part


## Plot random slopes per participant

data_formatted$pred_id <- predict(m_trans_no_interaction_complex, re.form = NULL)  # level-1 predictions


ggplot(data_formatted, 
       aes(x = ratio_RT_TT, y = log_djr, color = TT)) +
  geom_point(alpha = 0.4) +
  geom_line(aes(y = pred_id, group = TT)) +
  facet_wrap(~ ParticipantID)


