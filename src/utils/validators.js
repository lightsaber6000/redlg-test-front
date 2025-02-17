export const required = (val) => !!val;

export const email = (val) => {
    const email_regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return email_regex.test(val);
};
