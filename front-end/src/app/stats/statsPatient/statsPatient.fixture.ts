import { E2EComponentFixture } from "e2e/e2e-component.fixture";

export class StatsPatientFixture extends E2EComponentFixture {

    getRouteToProfil() {
        return this.page.getByRole('button', { name: 'Voir les profils' });
    }
}