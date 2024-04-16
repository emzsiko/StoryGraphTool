class Start extends Scene {
    create() {
        let storyTitle = this.engine.storyData.Title
        this.engine.setTitle(storyTitle); // TODO: replace this text using this.engine.storyData to find the story title
        this.engine.addChoice("Begin the story");
    }

    handleChoice() {
        let firstlocation = this.engine.storyData.InitialLocation;
        this.engine.gotoScene(Location, firstlocation); // TODO: replace this text by the initial location of the story
    }
}

class Location extends Scene {
    create(key) {
        let locationData = this.engine.storyData.Locations[key]; // TODO: use `key` to get the data object for the current story location
        this.engine.show(locationData.Body); // TODO: replace this text by the Body of the location data
        
        if(locationData.Choices && locationData.Choices.length > 0) { // TODO: check if the location has any Choices
            for(let choice of locationData.Choices) { // TODO: loop over the location's Choices
                this.engine.addChoice(choice.Text, choice.Target); // TODO: use the Text of the choice
                // TODO: add a useful second argument to addChoice so that the current code of handleChoice below works
            }
        } else {
            this.engine.addChoice("The end.")
        }
    }

    handleChoice(choice) {
        if(choice) {
            this.engine.show("> "+ choice);
            this.engine.gotoScene(Interaction, choice);
        } else {
            this.engine.gotoScene(End);
        }
    }
}

class Interaction extends Location {
    create(key) {
        super.create(key);
        let locationData = this.engine.storyData.Locations[key]; // TODO: use `key` to get the data object for the current story location

        if (key === "Run to the closet" && this.engine.hasItem("knife")) {
            for (let lockoption of locationData.Locked) {
                this.engine.addChoice(lockoption.Text, lockoption.Target);
            } 
        } else {
            if(locationData.Investigation && locationData.Investigation.length > 0) { // TODO: check if the location has any Choices
                for(let option of locationData.Investigation) { // TODO: loop over the location's Choices
                    this.engine.addChoice(option.Text, option.Target); // TODO: use the Text of the choice
                    // TODO: add a useful second argument to addChoice so that the current code of handleChoice below works
                }
            }
        }
    }
    handleChoice(choice) {
        if(choice) {
            if(choice === "Pick up the discarded supplies") {
                this.engine.addToInventory("knife");
            }
            this.engine.show("> "+ choice);
            this.engine.gotoScene(Interaction, choice);
        } else {
            this.engine.gotoScene(End);
        }
    }
}

class KnifeLocation extends Scene {
    handleChoice(choice) {
        if(choice === "Pick up the discarded supplies") {
            this.engine.addToInventory("knife");
            this.engine.gotoScene(Interaction, choice)
        }
    }
}

class End extends Scene {
    create() {
        this.engine.show("<hr>");
        this.engine.show(this.engine.storyData.Credits);
    }
}

Engine.load(Start, 'myStory.json');