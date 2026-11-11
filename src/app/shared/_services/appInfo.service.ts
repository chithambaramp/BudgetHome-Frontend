export class AppInfo {
    constructor() {

    }

    userID() {
        const currentUser = JSON.parse(localStorage.getItem('currentUser') || "[]");
        return currentUser?.userId;
    }

    userName() {
        const currentUser = JSON.parse(localStorage.getItem('currentUser') || "[]");
        return currentUser?.firstName;
    }

    Email() {
        const currentUser = JSON.parse(localStorage.getItem('currentUser') || "[]");
        return currentUser?.email;
    }

    Role() {
        const currentUser = JSON.parse(localStorage.getItem('currentUser') || "[]");
        return currentUser?.role;
    }

    token() {
        const currentUser = JSON.parse(localStorage.getItem('currentUser') || "[]");
        return currentUser?.access_token;
    }

    currentUser() {
        const currentUser = JSON.parse(localStorage.getItem('currentUser') || "[]");
        return currentUser;
    }
}