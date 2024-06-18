import { E2EComponentFixture } from "e2e/e2e-component.fixture";

export class ViewProfilFixture extends E2EComponentFixture {
    getNom() {
        return this.page.getByText('Nom');
    }
    getPrenom() {
        return this.page.getByText('Prénom');
    }
}