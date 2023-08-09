
export const errors = {
    emailOrPhoneAlreadyExists: 'Email or phone number already exists',
    userNotFound: 'User not found',
    notFound: 'Not found',
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
    refreshTokenNotPresent: "Refresh token is not present",
    accountNumberGenerationFailed: "Account number generation failed",
    validationError: 'Validation error',
    badRequest: 'Bad request',
    sameAccountNumber: 'Sender account must be different from beneficiary',
    forbiddenResource: 'Forbidden resource',
    accountBalanceBelowMinimum: 'Account balance is below minimum',
    insufficientFunds: 'Insufficient funds',
    accountNumberExists: 'Account number already exists',
    accountCreationFailed: 'Account creation failed',
    senderAccountNotFound: 'Sender account not found',
    beneficiaryAccountNotFound: 'Beneficiary account not found',
    invalidAmount: 'Invalid transfer amount',
    transactionFailed: 'Transaction failed'
};

export const responses = {
    success: 'Success',
    userRegistrationSuccess: 'User registration successful',
    loginSuccess: 'Login successful',
    transferSuccess: 'Transfer completed successfully',
    refreshTokenGenerated: 'Successfully generated refresh token',
    accountCreationSuccess: 'Account creation successful',
    rateLimitExceeded: 'Rate limit exceeded. Please wait and try again later.'
};

export const status = {
    failed: false,
    success: true,
}
