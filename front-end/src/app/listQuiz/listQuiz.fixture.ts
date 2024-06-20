import { E2EComponentFixture } from "e2e/e2e-component.fixture";

export class ListQuizFixture extends E2EComponentFixture {
    
    getSearchBar() {
        return this.page.getByPlaceholder('Rechercher un quiz');
    }
}