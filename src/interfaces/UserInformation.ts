export interface UserInformation {
    name: string;
    age: number;
    married: MarriedStatus;
    birth: string;
}

export enum MarriedStatus {
    Yes = 'yes',
    No = 'no',
    NoData = 'nodata',
}