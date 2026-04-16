export class AppInfo {
    constructor() {

    }

    userID() {
        const currentUser = JSON.parse(localStorage.getItem('currentUser') || "[]");
        return currentUser.userId;
    }

    userName() {
        const currentUser = JSON.parse(localStorage.getItem('currentUser') || "[]");
        return currentUser.firstName;
    }

    Role() {
        const currentUser = JSON.parse(localStorage.getItem('currentUser') || "[]");
        return currentUser.role;
    }

    token() {
        const currentUser = JSON.parse(localStorage.getItem('currentUser') || "[]");
        return currentUser.access_token;
    }

    currentUser() {
        const currentUser = JSON.parse(localStorage.getItem('currentUser') || "[]");
        return currentUser;
    }
}