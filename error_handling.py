import logging

class ErrorHandling:
    def __init__(self):
        self.logger = logging.getLogger('ErrorHandling')
        handler = logging.StreamHandler()
        formatter = logging.Formatter('%(asctime)s - %(name)s - %(levelname)s - %(message)s')
        handler.setFormatter(formatter)
        self.logger.addHandler(handler)
        self.logger.setLevel(logging.INFO)

    def handle_error(self, transaction_id, user_id, error, retry_callback=None):
        """
        Handles any errors that occur during fraud detection.
        Informs the user of the error and provides an option to retry the payment.
        
        Args:
            transaction_id (str): The ID of the transaction that failed.
            user_id (str): The ID of the user who initiated the transaction.
            error (Exception): The exception that was raised.
            retry_callback (callable): Optional callback function to retry the payment.
        """
        self.logger.error(f"Error occurred for user {user_id} on transaction {transaction_id}: {str(error)}")
        
        user_message = f"An error occurred while processing your transaction. Please try again later."

        # Depending on the error type, we can provide a more specific message.
        if isinstance(error, TimeoutError):
            user_message = "The transaction took too long to process. Please try again."

        elif isinstance(error, ConnectionError):
            user_message = "A connection error occurred. Please check your internet connection and try again."

        elif isinstance(error, ValueError):
            user_message = "Invalid data detected. Please check the details and try again."

        # Log the error details for further analysis
        self.log_error_details(transaction_id, user_id, error)

        # Inform the user about the error
        self.inform_user(user_id, user_message)

        # Optionally provide an option to retry the transaction
        if retry_callback:
            try:
                retry_callback()
                self.logger.info(f"Retrying transaction {transaction_id} for user {user_id}")
            except Exception as retry_error:
                self.logger.error(f"Retry failed for transaction {transaction_id} for user {user_id}: {str(retry_error)}")
                self.inform_user(user_id, "Retrying the transaction failed. Please try again later.")
        
    def log_error_details(self, transaction_id, user_id, error):
        """
        Logs detailed information about the error.

        Args:
            transaction_id (str): The ID of the transaction that failed.
            user_id (str): The ID of the user who initiated the transaction.
            error (Exception): The exception that was raised.
        """
        self.logger.info(f"Logging error details for transaction {transaction_id} for user {user_id}: {str(error)}")
        # Here we could also log to a file or external monitoring service
        # For example:
        # with open('error_log.txt', 'a') as f:
        #     f.write(f"{transaction_id}, {user_id}, {error}\n")
    
    def inform_user(self, user_id, message):
        """
        Informs the user about the error by sending a notification.

        Args:
            user_id (str): The ID of the user to inform.
            message (str): The notification message to send to the user.
        """
        self.logger.info(f"Sending notification to user {user_id}: {message}")
        # Here we could use a real notification service.
        # This is just a placeholder for the notification logic.
        # notification_service.send(user_id, message)
        print(f"Notification sent to user {user_id}: {message}")
