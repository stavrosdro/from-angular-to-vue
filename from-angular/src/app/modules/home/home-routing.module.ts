import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DetailComponent } from './components/detail/detail.component';
import { ApplicationComponent } from './containers/application/application.component';
import { DetailResolver } from './resolvers/detail.resolver';
import { HomeComponent } from './views/home/home.component';

const routes: Routes = [
    {
        path: '',
        component: HomeComponent,
        children: [
            {
                path: ':id',
                component: DetailComponent,
                resolve: {
                    job: DetailResolver,
                },
            },
            {
                path: 'apply',
                component: ApplicationComponent,
                outlet: 'modal',
            },
        ],
    },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class HomeRoutingModule {}
