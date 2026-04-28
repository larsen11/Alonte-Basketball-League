class FormModel {
    constructor(barangay, address, name, age, contact, height, weight, medicalConditions, competitionLevel, position) {
        this.barangay = barangay;
        this.address = address;
        this.name = name;
        this.age = age;
        this.contact = contact;
        this.height = height;
        this.weight = weight;
        this.medicalConditions = medicalConditions;
        this.competitionLevel = competitionLevel;
        this.position = position;
        this.createdAt = new Date(); // Added a timestamp just in case!
    }
}

module.exports = FormModel;