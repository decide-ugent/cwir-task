# Create table to collect data
# !! Run this only once to avoid deleting existing data
import sqlalchemy as sal
from sqlalchemy import create_engine, Column, String, Text
from sqlalchemy.orm import declarative_base, sessionmaker
from sqlalchemy.dialects.mysql import LONGTEXT

# Define the SQLAlchemy database connection URL
db_url = "mysql://algarrid:faunistico@localhost:3306/risky_dm_3"
# Create the SQLAlchemy engine
engine = create_engine(db_url)

# Define the SQLAlchemy declarative base
Base = declarative_base()

# Define the class for the 'instructionsCompletionTimes' table
class instructionsCompletionTimes(Base):
    __tablename__ = 'instructionsCompletionTimes'
    StudyID = Column(String(255))
    SessionID = Column(String(255))
    ParticipantID = Column(String(255), primary_key=True)
    CompletionTimeConsentForm = Column(String(255))
    CompletionTimeIntroduction = Column(String(255))
    CompletionTimeInstruction1 = Column(String(255))
    CompletionTimeInstruction2 = Column(String(255))
    CompletionTimeInstruction3 = Column(String(255))
    CompletionTimeInstruction4 = Column(String(255))
    CompletionTimeInstruction5 = Column(String(255))
    CompletionTimeInstruction6 = Column(String(255))
    CompletionTimeInstructionsCompleted = Column(String(255))
    CompletionTimeTimingInstructions = Column(String(255))
    CompletionTimeAllInstructions = Column(String(255))
    CompletionTimeComprehensionCheck1 = Column(String(255))
    CompletionTimeComprehensionCheck2 = Column(String(255))
    CompletionTimeComprehensionCheck3 = Column(String(255))
    CompletionTimeComprehensionCheck4 = Column(String(255))
    AttemptsLeftComprehensionCheck1 = Column(String(255))
    AttemptsLeftComprehensionCheck2 = Column(String(255))
    AttemptsLeftComprehensionCheck3 = Column(String(255))
    AttemptsLeftComprehensionCheck4 = Column(String(255))
    VisitsConsentForm = Column(String(255))
    VisitsInstruction1 = Column(String(255))
    VisitsInstruction2 = Column(String(255))
    VisitsInstruction3 = Column(String(255))
    VisitsInstruction4 = Column(String(255))
    VisitsInstruction5 = Column(String(255))
    VisitsInstruction6 = Column(String(255))

# Define the class for the 'metaData' table
class experimentMetaData(Base):
    __tablename__ = 'experimentMetaData'
    StudyID = Column(String(255))
    SessionID = Column(String(255))
    ParticipantID = Column(String(255), primary_key=True)
    TimePerceptionMeasureMethod = Column(String(255))
    QuestionnaireClass = Column(String(255))
    NumberOfRounds = Column(String(255))
    NumberOfRoundsPerBlock = Column(String(255))
    Lot0Probabilities = Column(Text)
    Lot1Probabilities = Column(Text)
    Lot0Values = Column(Text)
    Lot1Values = Column(Text)
    ObjectiveTimeIntervals = Column(Text)

"""
class practiceRoundsAnswers(Base):
    __tablename__ = 'practiceRoundsAnswers'
    StudyID = Column(String(255))
    SessionID = Column(String(255))
    PracticeRoundID = Column(String(255), primary_key=True)
    ParticipantID = Column(String(255))
    PracticeGambleNumber = Column(String(255))
    GambleChoice = Column(String(255))
    ResponseTimeGamble = Column(String(255))
    GambleSecondaryChoices = Column(Text)
    GambleSecondaryChoicesTimes = Column(Text)
    GambleDeadline = Column(String(255))
    MissedDeadline = Column(String(255))
    SubjectiveTime = Column(String(255))
    ResponseTimeSubjectiveTime = Column(String(255))
    ResponseTimeFirstAttemptSubjectiveTime =  Column(String(255))
    AttemptsAnswerSubjectiveTime = Column(String(255))
    ConfidenceSubjectiveTime = Column(String(255))
    ResponseTimeConfidenceSubjectiveTime = Column(String(255))
    SubjectiveDifficulty = Column(String(255))
    ResponseTimeSubjectiveDifficulty = Column(String(255))
    ResponseTimeSubmitAnswersQuestionnaire = Column(String(255))
"""

class practiceMouseCoordinates(Base):
    __tablename__ = 'practiceMouseCoordinates'
    StudyID = Column(String(255))
    SessionID = Column(String(255))
    PracticeRoundID = Column(String(255), primary_key=True)
    ParticipantID = Column(String(255))
    PracticeGambleNumber = Column(String(255))
    PracticeMouseXCoordinates = Column(LONGTEXT)
    PracticeMouseYCoordinates = Column(LONGTEXT)
    RectLeftOptionLeftXCoord = Column(String(255))
    RectLeftOptionRightXCoord = Column(String(255))
    RectLeftOptionTopYCoord = Column(String(255))
    RectLeftOptionBottomYCoord = Column(String(255))
    RectRightOptionLeftXCoord = Column(String(255))
    RectRightOptionRightXCoord = Column(String(255))
    RectRightOptionTopYCoord = Column(String(255))
    RectRightOptionBottomYCoord = Column(String(255))
    RectStartButtonLeftXCoord = Column(String(255))
    RectStartButtonRightXCoord = Column(String(255)) 
    RectStartButtonTopYCoord = Column(String(255))
    RectStartButtonBottomYCoord = Column(String(255))
    BigRectTopYCoord = Column(String(255)) 
    BigRectBottomYCoord = Column(String(255))
    BigRectLeftXCoord = Column(String(255))
    BigRectRightXCoord = Column(String(255))

class mouseCoordinates(Base):
    __tablename__ = 'mouseCoordinates'
    StudyID = Column(String(255))
    SessionID = Column(String(255))
    ExperimentRoundID = Column(String(255), primary_key=True)
    ParticipantID = Column(String(255))
    ExperimentGambleNumber = Column(String(255))
    ExperimentRoundNumber = Column(String(255))
    MouseXCoordinates =  Column(LONGTEXT)
    MouseYCoordinates =  Column(LONGTEXT)
    RectLeftOptionLeftXCoord = Column(String(255))
    RectLeftOptionRightXCoord = Column(String(255))
    RectLeftOptionTopYCoord = Column(String(255))
    RectLeftOptionBottomYCoord = Column(String(255))
    RectRightOptionLeftXCoord = Column(String(255))
    RectRightOptionRightXCoord = Column(String(255))
    RectRightOptionTopYCoord = Column(String(255))
    RectRightOptionBottomYCoord = Column(String(255))
    RectStartButtonLeftXCoord = Column(String(255))
    RectStartButtonRightXCoord = Column(String(255)) 
    RectStartButtonTopYCoord = Column(String(255))
    RectStartButtonBottomYCoord = Column(String(255))
    BigRectTopYCoord = Column(String(255)) 
    BigRectBottomYCoord = Column(String(255))
    BigRectLeftXCoord = Column(String(255))
    BigRectRightXCoord = Column(String(255))

"""
class experimentRoundsAnswers(Base):
    __tablename__ = 'experimentRoundsAnswers'
    StudyID = Column(String(255))
    SessionID = Column(String(255))
    ExperimentRoundID = Column(String(255), primary_key=True)
    ParticipantID = Column(String(255))
    BlockNumber = Column(String(255))
    ExperimentRoundNumber = Column(String(255))
    ExperimentGambleNumber = Column(String(255))
    LotteryLeft = Column(String(255))
    LotteryRight = Column(String(255))
    GambleChoice = Column(String(255))
    ResponseTimeGamble = Column(String(255))
    GambleSecondaryChoices = Column(Text)
    GambleSecondaryChoicesTimes = Column(Text)
    GambleDeadline = Column(String(255))
    MissedDeadline = Column(String(255))
    SubjectiveTime = Column(String(255))
    ResponseTimeSubjectiveTime = Column(String(255))
    ResponseTimeFirstAttemptSubjectiveTime =  Column(String(255))
    AttemptsAnswerSubjectiveTime = Column(String(255))
    ConfidenceSubjectiveTime = Column(String(255))
    ResponseTimeConfidenceSubjectiveTime = Column(String(255))
    SubjectiveDifficulty = Column(String(255))
    ResponseTimeSubjectiveDifficulty = Column(String(255))
    ResponseTimeSubmitAnswersQuestionnaire = Column(String(255))
"""

class experimentReproTaskMethod1Quest1Answers(Base):
    __tablename__ = 'experimentReproTaskMethod1Quest1Answers'
    StudyID = Column(String(255))
    SessionID = Column(String(255))
    ExperimentRoundID = Column(String(255), primary_key=True)
    ParticipantID = Column(String(255))
    BlockNumber = Column(String(255))
    ExperimentRoundNumber = Column(String(255))
    ExperimentGambleNumber = Column(String(255))
    LotteryLeft = Column(String(255))
    LotteryRight = Column(String(255))
    GambleChoice = Column(String(255))
    ResponseTimeGamble = Column(String(255))
    GambleSecondaryChoices = Column(Text)
    GambleSecondaryChoicesTimes = Column(Text)
    GamblePresetDeadline = Column(String(255))
    GambleFinalDeadline = Column(String(255))
    FullScreenExited = Column(String(255))
    ReproducedTime = Column(String(255))
    MissedMaxDeadline = Column(String(255))
    SubjectiveDifficulty = Column(String(255))
    ResponseTimeSubjectiveDifficulty = Column(String(255))
    ResponseTimeSubmitAnswersQuestionnaire = Column(String(255))

class practiceReproTaskMethod1Quest1Answers(Base):
    __tablename__ = 'practiceReproTaskMethod1Quest1Answers'
    StudyID = Column(String(255))
    SessionID = Column(String(255))
    PracticeRoundID = Column(String(255), primary_key=True)
    ParticipantID = Column(String(255))
    PracticeGambleNumber = Column(String(255))
    GambleChoice = Column(String(255))
    ResponseTimeGamble = Column(String(255))
    GambleSecondaryChoices = Column(Text)
    GambleSecondaryChoicesTimes = Column(Text)
    GamblePresetDeadline = Column(String(255))
    MissedDeadline = Column(String(255))
    FullScreenExited = Column(String(255))
    ReproducedTime = Column(String(255))
    SubjectiveDifficulty = Column(String(255))
    ResponseTimeSubjectiveDifficulty = Column(String(255))
    ResponseTimeSubmitAnswersQuestionnaire = Column(String(255))

class blockEndQuestionnaireAnswers(Base):
    __tablename__ = 'blockEndQuestionnaireAnswers'
    StudyID = Column(String(255))
    SessionID = Column(String(255))
    ParticipantID = Column(String(255))
    ParticipantID_BlockNumber = Column(String(255), primary_key=True)
    BlockNumber = Column(String(255))
    SubjectiveBlockTotalTime = Column(String(255))
    ResponseTimeSubjectiveBlockTotalTime = Column(String(255))
    ResponseTimeFirstAttemptSubjectiveBlockTotalTime = Column(String(255))
    AttemptsAnswerSubjectiveBlockTotalTime = Column(String(255))
    ConfidenceSubjectiveBlockTotalTime = Column(String(255))
    ResponseTimeConfidenceSubjectiveBlockTotalTime = Column(String(255))
    LevelBoredom = Column(String(255))
    ResponseTimeLevelBoredom = Column(String(255))
    TotalObjectiveBlockTime = Column(String(255))

class finalQuestionnaireAnswers(Base):
    __tablename__ = 'finalQuestionnaireAnswers'
    StudyID = Column(String(255))
    SessionID = Column(String(255))
    ParticipantID = Column(String(255), primary_key=True)
    CountingFrequency = Column(String(255))
    ResponseTimeCountingFrequency = Column(String(255))
    FocusLoss = Column(Text)
    InstructionsComprehension = Column(String(255))
    Feedback = Column(Text)
    FirstAttentionCheckRoundNumber = Column(String(255))
    SecondAttentionCheckRoundNumber = Column(String(255))
    FirstAttentionCheckAnswer = Column(String(255))
    SecondAttentionCheckAnswer = Column(String(255))
    TotalObjectiveStudyTime = Column(String(255))
    TotalEarned = Column(String(255))

class fullScreenMessages(Base):
    __tablename__ = 'fullScreenMessages'
    StudyID = Column(String(255))
    SessionID = Column(String(255))
    ParticipantID = Column(String(255))
    ParticipantID_timestamp = Column(String(255), primary_key=True)
    TimeFullScreenMessageAppeared = Column(String(255))
    ExperimentRoundNumber = Column(String(255))
    WhileInRound = Column(String(255))

class breaksData(Base):
    __tablename__ = 'breaksData'
    StudyID = Column(String(255))
    SessionID = Column(String(255))
    ParticipantID = Column(String(255))
    ParticipantID_BlockNumber = Column(String(255), primary_key=True)
    BlockNumber = Column(String(255))
    BreakTimeDuration = Column(String(255))
    BreakTime = Column(String(255))


# Create the table in the database
Base.metadata.create_all(engine)

# Close the database connection when done
engine.dispose()

