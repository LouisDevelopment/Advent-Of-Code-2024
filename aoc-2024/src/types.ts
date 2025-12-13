export type ChallengeStatus = 'locked' | 'available' | 'solved_part1' | 'solved_complete';

export interface DayChallenge {
    dayNumber: number;
    title: string;
    status: ChallengeStatus;
}

export const generateDays = (): DayChallenge[] => {
    const days: DayChallenge[] = [];
    //const today = new Date();
    const currentDay = 6;

    for (let i = 1; i <= 25; i++) {
        let status: ChallengeStatus = 'locked';
        if (i <= currentDay) status = 'available';
        //if (i === 1 || i === 2) status = 'solved_complete';
        //if (i === 3) status = 'solved_part1';

        days.push({
            dayNumber: i,
            title: `Day ${i} Placeholder Title`,
            status: status
        });
    }
    return days;
};