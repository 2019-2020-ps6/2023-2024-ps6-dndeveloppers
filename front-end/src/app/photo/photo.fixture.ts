import { E2EComponentFixture } from "e2e/e2e-component.fixture";

export class PhotoFixture extends E2EComponentFixture {
    getImages() {
        return this.page.locator('#images');
    }

    

}