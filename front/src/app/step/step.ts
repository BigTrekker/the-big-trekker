export class Step {
    latitude: number;
    longitude: number;
    authorName: string;
    date: Date;
    message: string;
    pictures?: Array<string>;
}

export const TEST_STEPS = [
    {
        latitude: 45.7503391,
        longitude: 4.8654167,
        authorName: "James Brown",
        date: new Date(2019, 0, 1),
        message: "Hello, this is a sample first comment",
    },
    {
        latitude: 45.7350647,
        longitude: 4.8960582,
        authorName: "James Brown",
        date: new Date(2019, 0, 3),
        message: "Hello, this is a sample second comment",
    },
    {
        latitude: 45.7583341,
        longitude: 4.9562685,
        authorName: "Tom Jones",
        date: new Date(2019, 0, 8),
        message: "Hello, this is a sample third comment",
    },
];