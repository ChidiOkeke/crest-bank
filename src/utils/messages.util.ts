
export const errors = {
    emailOrPhoneAlreadyExists: 'Email or phone number already exists',
    userNotFound: 'User not found',
    senderNotFound: 'Sender not found',
    beneficiaryNotFound: 'Beneficiary not found',
    invalidCredentials: 'Invalid credentials',
    internalServerError: 'An internal server error occurred',
    noAuthorizationHeader: "No Authorization header provided",
    invalidAuthorizationHeader: "Invalid Authorization Header",
    authorizationError: "Authorization Error",
    invalidTokenType: "Invalid token type",
    refreshTokenUsed: "Refresh token was already used",
    invalidJwtToken: "Invalid jwt token",
    refreshTokenFailed: "Refresh token generation failed",
    refreshTokenNotPresent: "Refresh token is not present"
};

export const responses = {
    userRegistrationSuccess: 'User registration successful',
    loginSuccess: 'Login successful',
    transferSuccess: 'Transfer completed successfully',
    refreshTokenGenerated: 'Successfully generated refresh token'
};

export const status = {
    failed: false, 
    success: true,
}
