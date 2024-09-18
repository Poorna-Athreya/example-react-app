import logging
from src.fraud_detection.fraud_detection_model import load_model, predict_fraud
from src.notification_service import notify_user, notify_admin
from src.error_handling import handle_error

# Configure logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

class TransactionValidator:
    def __init__(self):
        try:
            self.model = load_model()
            logger.info("Fraud detection model loaded successfully.")
        except Exception as e:
            logger.error(f"Failed to load fraud detection model: {e}")
            raise

    def validate_transaction(self, transaction):
        """
        Validates a transaction by running it through fraud detection checks.
        If the transaction is high-risk, it flags it.

        Parameters:
        - transaction (dict): The transaction data to validate.

        Returns:
        - dict: The validation results including risk score and status.
        """
        try:
            # Extract necessary fields from the transaction
            required_fields = ['transaction_id', 'amount', 'timestamp', 'account_details']
            for field in required_fields:
                if field not in transaction:
                    raise ValueError(f"Transaction missing required field: {field}")

            logger.info(f"Validating transaction ID: {transaction['transaction_id']}")

            # Predict the risk score using the fraud detection model
            risk_score = predict_fraud(self.model, transaction)
            logger.info(f"Risk score for transaction ID {transaction['transaction_id']}: {risk_score}")

            # Determine if the transaction should be flagged as high risk
            is_high_risk = risk_score > 0.8  # Threshold for high-risk can be adjusted

            if is_high_risk:
                # Notify the user and admin of the high-risk transaction
                logger.warning(f"Transaction ID {transaction['transaction_id']} flagged as high-risk.")
                notify_user(transaction['account_details']['user_id'], transaction['transaction_id'])
                notify_admin(transaction['transaction_id'], risk_score)

            return {
                "transaction_id": transaction['transaction_id'],
                "risk_score": risk_score,
                "is_high_risk": is_high_risk
            }
        
        except Exception as e:
            logger.error(f"Error validating transaction ID {transaction.get('transaction_id', 'unknown')}: {e}")
            handle_error(e, transaction)
            return {
                "transaction_id": transaction.get('transaction_id', 'unknown'),
                "error": str(e)
            }

