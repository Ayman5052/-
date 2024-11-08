// نموذج التسجيل
document.getElementById("registrationForm").onsubmit = function(event) {
    event.preventDefault(); // منع إعادة تحميل الصفحة

    const username = document.getElementById("username").value;
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    // تخزين البيانات في Local Storage
    const users = JSON.parse(localStorage.getItem('users')) || [];
    // التحقق من وجود مستخدم بنفس البريد الإلكتروني
    const existingUser = users.find(user => user.email === email);
    if (existingUser) {
        document.getElementById("message").innerText = "هذا البريد الإلكتروني مستخدم بالفعل.";
        return;
    }

    users.push({ username, email, password });
    localStorage.setItem('users', JSON.stringify(users));

    document.getElementById("message").innerText = `تم تسجيل ${username} بنجاح!`;
    document.getElementById("registrationForm").reset();
};
