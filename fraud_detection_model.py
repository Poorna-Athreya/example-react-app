# src/fraud_detection/fraud_detection_model.py
import joblib
import os
import logging

# Set up logging for the module
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

# Constants for model paths
MODEL_PATH = "path_to_your_model/fraud_detection_model.pkl"

def load_model():
    """
    Loads the pre-trained machine learning model used for detecting fraudulent transactions.
    """
    try:
        if not os.path.exists(MODEL_PATH):
            raise FileNotFoundError(f"Model file not found at {MODEL_PATH}")

        model = joblib.load(MODEL_PATH)
        logger.info("Model loaded successfully.")
        return model
    except FileNotFoundError as fnf_error:
        logger.error(fnf_error)
        raise
    except Exception as e:
        logger.error(f"Unexpected error occurred while loading the model: {e}")
        raise

def predict_fraud(model, transaction_data):
    """
    Uses the loaded model to predict the likelihood of a transaction being fraudulent.
    
    Parameters:
    model: The pre-loaded machine learning model.
    transaction_data: The data about the transaction to be evaluated.

    Returns:
    float: A risk score indicating the likelihood of the transaction being fraudulent.
    """
    try:
        if not hasattr(model, 'predict_proba'):
            raise AttributeError("The provided model does not have the method 'predict_proba'")

        if transaction_data is None or not isinstance(transaction_data, (dict, list)):
            raise ValueError("Transaction data must be a non-empty dictionary or list.")

        transaction_data = preprocess_transaction_data(transaction_data) # assuming a preprocessing function exists
        risk_score = model.predict_proba(transaction_data)[:, 1]  # Get probability of fraud
        logger.info("Transaction risk score predicted successfully.")
        return risk_score
    except AttributeError as ae:
        logger.error(ae)
        raise
    except ValueError as ve:
        logger.error(ve)
        raise
    except Exception as e:
        logger.error(f"Unexpected error occurred during fraud prediction: {e}")
        raise

def preprocess_transaction_data(transaction_data):
    """
    Preprocesses the transaction data before it is fed to the model.
    This is a placeholder, insert actual preprocessing logic according to your model requirements.

    Parameters:
    transaction_data: The data about the transaction to be evaluated.

    Returns:
    Preprocessed transaction data ready for model evaluation.
    """
    # Placeholder preprocessing logic. Replace with actual preprocessing steps.
    return transaction_data
