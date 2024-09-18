import logging
import smtplib
from email.message import EmailMessage

# Configure logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

# Email configuration constants
SMTP_SERVER = 'smtp.example.com'
SMTP_PORT = 587
EMAIL_ADDRESS = 'noreply@example.com'
EMAIL_PASSWORD = 'yourpassword'

def send_email(subject, body, to_address):
    """
    Sends an email using the configured SMTP server.

    Args:
        subject (str): The subject of the email.
        body (str): The body content of the email.
        to_address (str): The recipient's email address.

    Raises:
        smtplib.SMTPException: Raised if there is an error sending the email.
    """
    try:
        msg = EmailMessage()
        msg.set_content(body)
        msg['Subject'] = subject
        msg['From'] = EMAIL_ADDRESS
        msg['To'] = to_address

        with smtplib.SMTP(SMTP_SERVER, SMTP_PORT) as server:
            server.starttls()
            server.login(EMAIL_ADDRESS, EMAIL_PASSWORD)
            server.send_message(msg)
        
        logger.info(f'Email sent to {to_address}')
    except smtplib.SMTPException as e:
        logger.error(f'Error sending email to {to_address}: {e}')
        raise


def notify_user(user_email, transaction_id):
    """
    Sends a notification to the user informing them of a blocked transaction.

    Args:
        user_email (str): The user's email address.
        transaction_id (str): The transaction ID that was blocked.
    
    Raises:
        ValueError: Raised if the user_email or transaction_id is invalid.
    """
    if not user_email or not transaction_id:
        raise ValueError("User email and transaction ID must be provided")
    
    subject = 'Blocked Transaction Alert'
    body = f"Dear User,\n\nYour transaction with ID {transaction_id} was blocked due to suspected fraudulent activity.\n\nBest regards,\nFraud Detection Team"
    
    logger.info(f'Sending notification to user: {user_email} for transaction: {transaction_id}')
    send_email(subject, body, user_email)


def notify_admin(admin_email, transaction_id, risk_score):
    """
    Sends a real-time alert to the admin about the flagged transaction.

    Args:
        admin_email (str): The admin's email address.
        transaction_id (str): The transaction ID that was flagged.
        risk_score (float): The risk score associated with the flagged transaction.

    Raises:
        ValueError: Raised if the admin_email, transaction_id, or risk_score is invalid.
    """
    if not admin_email or not transaction_id or risk_score is None:
        raise ValueError("Admin email, transaction ID, and risk score must be provided")

    subject = 'Fraud Alert: Flagged Transaction'
    body = f"Dear Admin,\n\nA transaction with ID {transaction_id} was flagged for potential fraud.\nRisk Score: {risk_score}\n\nBest regards,\nFraud Detection Team"
    
    logger.info(f'Sending alert to admin: {admin_email} for transaction: {transaction_id} with risk score: {risk_score}')
    send_email(subject, body, admin_email)
