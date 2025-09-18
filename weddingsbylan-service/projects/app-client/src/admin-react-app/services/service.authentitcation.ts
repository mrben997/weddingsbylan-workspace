import { secureLocalStorage, InitialStore } from "../ultilities/SecureLocalStorage";

class AuthenticationService {
    private readonly apiUrl = `${location.origin}/api`;
    private readonly loginEndpoint = '/users/v2/login';
    private readonly refreshTokenEndpoint = '/users/refresh-token';
    private tokenRefreshTimeout: NodeJS.Timeout | null = null;

    isAuthenticated(): boolean {
        return !!this.getRefreshToken();
    }

    getRoles(): any {
        throw new Error('Method not implemented.');
    }

    unsubscribe(id: number): void {
        throw new Error('Method not implemented.');
    }

    subscribe(callback: () => void): number {
        throw new Error('Method not implemented.');
    }

    async login(email: string, password: string): Promise<boolean> {
        try {
            const response = await fetch(`${this.apiUrl}${this.loginEndpoint}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email, password }),
            });

            if (!response.ok) throw new Error('Login failed');

            const data = await response.json();
            this.setTokens(data.accessToken, data.refreshToken);
            this.scheduleTokenRefresh(data.accessToken);
            return true;
        } catch (error) {
            console.error('Login error:', error);
            return false;
        }
    }

    private setTokens(accessToken: string, refreshToken: string): void {
        secureLocalStorage.setItem('accessToken', accessToken);
        secureLocalStorage.setItem('refreshToken', refreshToken);
    }

    getAccessToken(): string | null {
        return secureLocalStorage.getItem('accessToken');
    }

    getRefreshToken(): string | null {
        return secureLocalStorage.getItem('refreshToken');
    }

    private scheduleTokenRefresh(accessToken: string): void {
        if (this.tokenRefreshTimeout) {
            clearTimeout(this.tokenRefreshTimeout);
        }

        const tokenData = this.parseJwt(accessToken);
        if (!tokenData) return;

        const expirationTime = tokenData.exp * 1000;
        const refreshTime = expirationTime - Date.now() - 10000; // Refresh 10 seconds before expiration

        if (refreshTime > 0) {
            this.tokenRefreshTimeout = setTimeout(async () => {
                try {
                    const refreshed = await this.signinsilent();
                    if (refreshed) {
                        const newAccessToken = this.getAccessToken();
                        if (newAccessToken) {
                            this.scheduleTokenRefresh(newAccessToken);
                        }
                    }
                } catch (error) {
                    console.error('Token refresh error:', error);
                }
            }, refreshTime);
        }
    }

    signinsilent = async (): Promise<boolean> => {
        const refreshToken = this.getRefreshToken();
        if (!refreshToken) return false;

        try {
            await this.refreshToken(refreshToken);
            return true;
        } catch (error) {
            console.error('Silent signin failed:', error);
            return false;
        }
    };

    private async refreshToken(refreshToken: string): Promise<void> {
        try {
            const response = await fetch(`${this.apiUrl}${this.refreshTokenEndpoint}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ refreshToken }),
            });

            if (!response.ok) throw new Error('Failed to refresh token');

            const data = await response.json();
            this.setTokens(data.accessToken, refreshToken); // Reuse the same refreshToken
            this.scheduleTokenRefresh(data.accessToken);
        } catch (error) {
            console.error('Token refresh error:', error);
            this.logout(); // Optional: Logout if refresh fails
        }
    }

    private parseJwt(token: string): any | null {
        try {
            const base64Url = token.split('.')[1];
            const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
            const jsonPayload = decodeURIComponent(atob(base64).split('').map(c =>
                '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2)).join(''));

            return JSON.parse(jsonPayload);
        } catch (error) {
            console.error('Failed to parse token:', error);
            return null;
        }
    }

    async initializeTokenRefresh(): Promise<void> {
        await InitialStore()
        const accessToken = this.getAccessToken();
        const refreshToken = this.getRefreshToken();
        if (accessToken && refreshToken) {
            this.scheduleTokenRefresh(accessToken);
        }
    }
    _clearCookie = () => {
        return fetch("/logout").then(x => x.json())
    }
    async logout() {
        secureLocalStorage.removeItem('accessToken');
        secureLocalStorage.removeItem('refreshToken');
        if (this.tokenRefreshTimeout) {
            clearTimeout(this.tokenRefreshTimeout);
        }
        try {
            await this._clearCookie()
        } catch (error) {

        }
    }
}

export const authenticationService = new AuthenticationService();
authenticationService.initializeTokenRefresh();

// (window as any).auth = authenticationService;
