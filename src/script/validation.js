function validation(data) {
    // validationRules could be extracted from this function
    const validationRules = {
        name: {
        condition: !data.userName,
        message: "請填寫姓名欄位"
        },
        phone: {
        condition: !data.userPhone,
        message: "請填寫手機欄位"
        },
        email: {
        condition: !data.userEmail,
        message: "請填寫Email欄位"
        },
        emailRegex: {
        condition: !(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(data.userEmail)),
        message: "Email欄位格式不正確"
        },
    };

    let isValid = true;
    let msg = [];
    for (let key in validationRules) {
        if (isValid && validationRules[key].condition) {
            msg.push(validationRules[key].message);
            // isValid = false;
        }

    }
    return msg;
}

export default validation;