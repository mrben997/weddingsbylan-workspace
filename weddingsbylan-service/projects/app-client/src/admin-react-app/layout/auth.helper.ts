import { authenticationService } from "../services/service.authentitcation";

export const checkAuth = () => {
    const isAuthenticated = authenticationService.isAuthenticated();
    if (isAuthenticated) {
        location.pathname = "/admin/"
    } else {
        location.pathname = "/admin/"
    }
};