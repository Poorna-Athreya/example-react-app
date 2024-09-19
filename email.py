import smtplib
from email.mime.multipart import MIMEMultipart
from email.mime.text import MIMEText
from email.mime.base import MIMEBase
from email import encoders
from typing import List, Optional

def send_email(to_addresses: List[str], subject: str, body: str, 
               from_address: str, smtp_server: str, smtp_port: int, 
               username: str, password: str, attachments: Optional[List[str]] = None) -> None:
    """
    Sends an email to the specified recipients.

    :param to_addresses: List of recipients' email addresses
    :param subject: Subject of the email
    :param body: Body of the email
    :param from_address: Sender's email address
    :param smtp_server: SMTP server address
    :param smtp_port: SMTP server port
    :param username: Username for SMTP authentication
    :param password: Password for SMTP authentication
    :param attachments: List of file paths to attach to the email (optional)

    :raises Exception: If fails to send the email
    """
    try:
        # Create the root message and fill in the basic details
        msg = MIMEMultipart()
        msg['From'] = from_address
        msg['To'] = ', '.join(to_addresses)
        msg['Subject'] = subject

        # Attach the email body to the message
        msg.attach(MIMEText(body, 'plain'))

        # Attach any files provided
        if attachments:
            for file_path in attachments:
                attachment = open(file_path, "rb")
                part = MIMEBase('application', 'octet-stream')
                part.set_payload(attachment.read())
                encoders.encode_base64(part)
                part.add_header('Content-Disposition', f"attachment; filename= {file_path}")
                msg.attach(part)

        # Connect to the server and send the email
        server = smtplib.SMTP(smtp_server, smtp_port)
        server.starttls()
        server.login(username, password)
        text = msg.as_string()
        server.sendmail(from_address, to_addresses, text)
        server.quit()
        print("Email sent successfully.")

    except Exception as e:
        print(f"Failed to send email: {str(e)}")
        raise

# Example usage
if __name__ == "__main__":
    send_email(
        to_addresses=["recipient@example.com"],
        subject="Test Email",
        body="This is a test email.",
        from_address="sender@example.com",
        smtp_server="smtp.example.com",
        smtp_port=587,
        username="your-username",
        password="your-password",
        attachments=["path/to/attachment.pdf"]
    )
