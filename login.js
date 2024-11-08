// نموذج تسجيل الدخول
document.getElementById("loginForm").onsubmit = function(event) {
    event.preventDefault(); // منع إعادة تحميل الصفحة

    const email = document.getElementById("loginEmail").value;
    const password = document.getElementById("loginPassword").value;

    const users = JSON.parse(localStorage.getItem('users')) || [];
    const user = users.find(user => user.email === email && user.password === password);

    if (user) {
        document.getElementById("loginMessage").innerText = `مرحبًا بك، ${user.username}!`;
    } else {
        document.getElementById("loginMessage").innerText = "البريد الإلكتروني أو كلمة المرور غير صحيحة.";
    }

    document.getElementById("loginForm").reset();
};
