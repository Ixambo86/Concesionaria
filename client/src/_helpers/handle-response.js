import { authenticationService } from '../_services/authentication.service';

export function handleResponse(response) {
    if (response.data){
        const data = response.data ;
        if (!response.statusText === 'OK') {
            if ([401, 403].indexOf(response.status) !== -1) {
                // auto logout if 401 Unauthorized or 403 Forbidden response returned from api
                authenticationService.logout();
                window.location.forceReload(true);
            }

            const error = (data && data.message) || response.statusText;
            return Promise.reject(error);
        }
    return data;

    } else if (response.data===''){
        return;
        
    } else {

        return response.text().then(text => {
            const data = text && JSON.parse(text);
            if (!response.ok) {
                if ([401, 403].indexOf(response.status) !== -1) {
                    // auto logout if 401 Unauthorized or 403 Forbidden response returned from api
                    authenticationService.logout();
                    window.location.forceReload(true);
                }

                const error = (data && data.message) || response.statusText;
                return Promise.reject(error);
            }
            return data;
        });
    }
}