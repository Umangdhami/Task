const otpFields = document.querySelectorAll('.otp-field');

otpFields.forEach((field, index) => {
    field.addEventListener('input', (e) => {
        if (e.inputType === 'deleteContentBackward' && index !== 0) {
            otpFields[index - 1].focus();
        } else if (index !== otpFields.length - 1) {
            otpFields[index + 1].focus();
        }
    });

    field.addEventListener('keydown', (e) => {
        const key = e.key;
        if (key === 'Backspace' && index !== 0 && field.value === '') {
            otpFields[index - 1].focus();
        }
    });
});