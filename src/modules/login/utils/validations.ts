export const validateEmail = (email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
};

export const validatePassword = (password: string): boolean => {
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+\-={}|:"<>?~`[\]\\';,./]).{8,}$/;
    return passwordRegex.test(password);
};

export const validateNickname = (nickname: string): boolean => {
    const nicknameRegex = /^[a-zA-Z0-9!@#$%^&*()_+\-={}|:"<>?~`[\]\\';,./]{1,20}$/;
    return nicknameRegex.test(nickname);
};