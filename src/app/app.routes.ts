import { Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { AuthenticationCodeComponent } from './authentication-code/authentication-code.component';
import { codeGuard } from './guards/code/code.guard';
import { ForumComponent } from './forum/forum.component';
import { PageTemplateComponent } from './page-template/page-template.component';
import { UsersComponent } from './users/users.component';
import { MessageCheckComponent } from './message-check/message-check.component';
import { loginGuard } from './guards/login/login.guard';
import { authGuard } from './guards/auth/auth.guard';
import { CommentsComponent } from './comments/comments.component';

export const routes: Routes = [
    {
        path: '',
        title: 'Forum',
        component: PageTemplateComponent,
        children: [
            {
                path: 'forum',
                title: 'Forum',
                component: ForumComponent,
                canActivate: [authGuard]
            },
            {
                path: 'forum/:id',
                title: 'Comments',
                component: CommentsComponent,
            },
            {
                path: 'users',
                title: 'Users',
                component: UsersComponent,
                canActivate: [authGuard]
            },
            {
                path: 'message-check',
                title: 'Panding comments',
                component: MessageCheckComponent,
                canActivate: [authGuard]
            },
            {
                path: '',
                redirectTo: 'forum',
                pathMatch: 'full'
            },
        ]
    },

    {
        path: 'login',
        title: 'Login',
        component: LoginComponent,
        canActivate: [loginGuard]
    },
    {
        path: 'code',
        title: 'Code',
        component: AuthenticationCodeComponent,
        canActivate: [codeGuard]
    },
    {
        path: 'register',
        title: 'Register',
        component: RegisterComponent,
        canActivate: [loginGuard]
    },
   
    {
        path: '',
        redirectTo: 'login',
        pathMatch: 'full'
    },
];
