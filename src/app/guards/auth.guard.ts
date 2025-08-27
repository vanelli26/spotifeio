import {CanActivateFn, UrlTree} from '@angular/router';

export const authGuard: CanActivateFn =
  async (rota, estado):
    Promise<boolean | UrlTree> => {
  return true;
}
