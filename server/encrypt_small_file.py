from cryptography.hazmat.primitives import serialization, hashes
from cryptography.hazmat.primitives.asymmetric import padding
from cryptography.hazmat.primitives.ciphers import Cipher, algorithms, modes
from cryptography.hazmat.backends import default_backend
import os
import base64

# Load the RSA public key
def load_rsa_public_key(pem_data):
    return serialization.load_pem_public_key(
        pem_data.encode(), backend=default_backend()
    )

# Encrypt data using AES
def aes_encrypt(data, key):
    iv = os.urandom(16)  # Initialization vector
    cipher = Cipher(algorithms.AES(key), modes.CFB(iv), backend=default_backend())
    encryptor = cipher.encryptor()
    encrypted_data = encryptor.update(data.encode()) + encryptor.finalize()
    return iv + encrypted_data  # Prepend IV for use in decryption

# Encrypt the AES key using RSA
def rsa_encrypt_aes_key(aes_key, public_key):
    encrypted_key = public_key.encrypt(
        aes_key,
        padding.OAEP(
            mgf=padding.MGF1(algorithm=hashes.SHA256()),
            algorithm=hashes.SHA256(),
            label=None
        )
    )
    return base64.b64encode(encrypted_key).decode('utf-8')

# Main encryption function
def encrypt_data(data, recipient_public_key_pem):
    recipient_public_key = load_rsa_public_key(recipient_public_key_pem)

    # Generate a random AES key
    aes_key = os.urandom(32)  # 256-bit key

    # Encrypt the data with AES
    encrypted_data = aes_encrypt(data, aes_key)

    # Encrypt the AES key with the recipient's RSA public key
    encrypted_aes_key = rsa_encrypt_aes_key(aes_key, recipient_public_key)

    return {
        "encrypted_data": base64.b64encode(encrypted_data).decode('utf-8'),
        "encrypted_aes_key": encrypted_aes_key
    }

# Example usage
recipient_public_key_pem = """-----BEGIN PUBLIC KEY-----
MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEA2OBE814QEcYuYcMkrezd
9Fo/olxD30RDLVAIERxRMrnfCMdtttYBBdx5AxqRzpC+kdg4kKCUWl6Qk81yk2Y7
Qp20/FFOftP++kx4izhQebljwasOJ/Mylq9hNHz2v0k3nZfmegkafmK1rJjBHIqv
El9U3ncmSJXsgWV2VPkkRX/Z3z+DljZR4sNbI3Si7u3ugUMOtphO79+i9cWXq4br
DexOAWNNGHSzCX5+mEQ1rj24sBSrYBa/3Fy9bMUkDLHAdrjfipRKsEK9JvECL2Sj
0mIx35iICZu52SB/WJERIhAfFMKuikE9mfP9zAJ2AxTN2Y+SpwWpnVdlxQg7Ufv6
cwIDAQAB
-----END PUBLIC KEY-----
"""  # Replace with actual public key

large_data = """Hello world"""
encrypted_result = encrypt_data(large_data, recipient_public_key_pem)
print(encrypted_result)