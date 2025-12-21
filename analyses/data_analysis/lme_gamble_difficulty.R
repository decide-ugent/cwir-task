##----------------Load packages-------------------------------
library(httr)    
library(readr)     
library(dplyr)    
library(lme4)       
library(performance)   
library(see)
library(ordinal)
library(serp)  
library(emmeans)
library(rms)    
library(Hmisc)   # not rms::


##----------------Import and format data-------------------------------

setwd("C:/Users/Administrator/OneDrive - UGent/Experiments/risky_dm/data_analysis/decision_making_models/PyMC/Hierarchical/data_analysis")

# Load processed experiment data ----
processed_path <- "../data_preprocessing/processed_data/processed_risky_dm_task_data.csv"

df_processed_experiment_data <- tryCatch(
  {
    read_csv(processed_path)   # or read.csv(processed_path)
  },
  error = function(e) {
    message("File not found. Please run the preprocessing pipeline first to generate 'processed_risky_dm_task_data.csv'.")
    stop(e)
  }
)

message("Successfully loaded processed experiment data")


# Download gambles.csv 

username <- "algarrid"
password <- "faunistico"  # <- better: use an env var, not plain text

file_url <- paste0(
  "https://cloud.ilabt.imec.be/remote.php/dav/files/",
  "af741990-37f9-103d-9441-9bec5c4808a7/ExperimentsData/",
  "cwir_dataset/stimuli/gambles.csv"
)

response <- GET(file_url, authenticate(username, password))

if (status_code(response) == 200) {
  df_gambles <- read_csv(content(response, "text", encoding = "UTF-8"))
  message("Gambles downloaded")
} else {
  stop("Failed to retrieve the file. Status code: ", status_code(response))
}

# Format data

# Attach dX, dP, dEV to the processed data
df <- df_processed_experiment_data %>%
  left_join(
    df_gambles %>% select(GambleNumber, dX, dP, dEV),
    by = c("ExperimentGambleNumber" = "GambleNumber")
  )

# Centre predictors and compute logRT ----

df <- df %>%
  mutate(
    dX_c  = dX  - mean(dX,  na.rm = TRUE),
    dP_c  = dP  - mean(dP,  na.rm = TRUE),
    dEV_c = dEV - mean(dEV, na.rm = TRUE),
    logRT = log(ResponseTimeGamble),
    RT = ResponseTimeGamble
  )

# Make sure ParticipantID is a factor
df$ParticipantID <- as.factor(df$ParticipantID)

# Likert scale

df$SubjectiveDifficulty <- ordered(df$SubjectiveDifficulty, levels = 1:5)

# Scale dX and dP
df$dX_z <- as.numeric(scale(df$dX))
df$dP_z <- as.numeric(scale(df$dP))

# Group difficulty into three levels
df <- df %>%
  mutate(
    SubjDiff3 = case_when(
      SubjectiveDifficulty %in% c(1, 2) ~ 0L,
      SubjectiveDifficulty == 3        ~ 1L,
      SubjectiveDifficulty %in% c(4, 5) ~ 2L,
      TRUE                             ~ NA_integer_  # safety
    ),
    SubjDiff3 = ordered(SubjDiff3, levels = c(0, 1, 2))
  )




##-----------------logRT as a function of dX, dP and interaction-----------------------
lmer1_null <- lmer(
  logRT ~ (1 | ParticipantID),
  data = df,
  REML = TRUE
)



lmer1_no_interaction <- lmer(
  logRT ~ dX_z + dP_z + (1 | ParticipantID),
  data = df,
  REML = TRUE
)


lmer1 <- lmer(
  logRT ~ dX_z * dP_z + (1 | ParticipantID),
  data = df,
  REML = TRUE
)

summary(lmer1)


# compare models
AIC(lmer1_null, lmer1_no_interaction, lmer1)


# Marginal and conditional R- squared of best model----
r.squaredGLMM(lmer1)

# Model diagnostics
performance::check_model(lmer1)


## -----------------Correlation between likert scale and RT -------------

clm_null_m <- clmm2(
  SubjDiff3 ~ 1,
  random = ParticipantID,
  Hess=TRUE,
  data = df,
  
)
summary(clm_null_m)


clm_m <- clmm2(
  SubjDiff3 ~ logRT,
  random = ParticipantID,
  data = df,
  Hess = TRUE

)

summary(clm_m)



clm_raw_m <- clmm2(
  SubjDiff3 ~ RT,
  random = ParticipantID,
  data = df,
  Hess = TRUE
  
)


summary(clm_raw_m)

clm_n_m <- clmm2(
  SubjDiff3 ~ logRT,
  random = ParticipantID,
  nominal = ~logRT,
  data = df,
  Hess = TRUE
)

summary(clm_n_m)

clm_s_m <- clmm2(
  SubjDiff3 ~ logRT,
  random = ParticipantID,
  scale = ~logRT,
  Hess=TRUE,
  data = df,
  
)

summary(clm_s_m)


# Compute pseudo R squared (McFadden)
performance::r2_mcfadden(clm_m)
performance::r2_mcfadden(clm_s_m)


# Confirm that it is correct

ll_full <- as.numeric(logLik(clm_m))
ll_null <- as.numeric(logLik(clm_null_m))

R2_McFadden <- 1 - (ll_full / ll_null)

R2_McFadden

# Compare models

AIC(clm_null_m, clm_m, clm_n_m, clm_s_m)

# Compare log transformed with raw RTs:

AIC(clm_m, clm_raw_m)

# Test significance of multiple components:

# Test if the fixed effect is needed with likelihood ratio test
anova(clm_m, clm_null_m)

# Test the proportional odds assumption (test of nominal effects) with likelihood ratio test
anova(clm_m, clm_n_m)

# Test of scale effects with likelihood ratio test
anova(clm_m, clm_s_m)







