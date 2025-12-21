##-------------Install Packages -------------
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

##-------------Download data -------------

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

##-------------Clean and format data --------------------

# Filter out trials where the maximum deadline was surpassed (RT>10s) 
# and where full screen mode was exitd
df_data <- df_processed_experiment_data  %>%
  filter(MissedMaxDeadline == 0 & FullScreenExited == 0)


# Format the data

data_formatted <- df_data %>%
  mutate(
    ParticipantID = as.factor(ParticipantID),  # Convert ParticipantID to a factor (equivalent to 'category' in pandas)
    TT = GambleFinalDeadline,  
    repro_t = ReproducedTime,
    log_repro_t = log(ReproducedTime),
  )

##-------------Fit models --------------------

lme4_m <- lmer(log_repro_t ~ TT + (1 + TT| ParticipantID), data = data_formatted)
summary(lme4_m)

lme4_simple_m <- lmer(log_repro_t ~ TT + (1| ParticipantID), data = data_formatted)
summary(lme4_simple_m)

lme4_null <- lmer(log_repro_t ~ (1| ParticipantID), data = data_formatted)
summary(lme4_null)


##-------------Compare models --------------------

AIC(lme4_null, lme4_simple_m, lme4_m)

##-------------Check performance of best model --------------------


r2_values <- r.squaredGLMM(lme4_m)

print(r2_values)

performance::check_model(lme4_m)


##-------------Save data --------------------

re <- ranef(lme4_m)$ParticipantID  # columns: "(Intercept)", "TT"

# Fixed effect for TT
fixed_TT <- fixef(lme4_m)["TT"]

# Build a data frame with IDs and slopes
slopes_df <- data.frame(
  ParticipantID   = rownames(re),
  rand_slope_TT   = re[, "TT"],                  # random part only
  total_slope_TT  = fixed_TT + re[, "TT"]        # participant-specific slope
)

# Save to CSV (in your current working directory)
write.csv(slopes_df, "participant_TT_slopes.csv", row.names = FALSE)
