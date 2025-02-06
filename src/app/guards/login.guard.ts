import { inject } from "@angular/core";
import { Router } from "@angular/router";

// Check if user is logged
export const loginGuard = () => {
    const router = inject(Router);

    if (localStorage.getItem('token_doble_electricidad')) {
        return true;
    } else {
        router.navigate(['/login']);
        return false;
    }
}

// Check if user is not logged
export const authGuard = () => {
    const router = inject(Router);

    if (localStorage.getItem('token_doble_electricidad')) {
        router.navigate(['/list']);
        return false;
    }
    return true;
};