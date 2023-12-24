import FALLBACK_IMAGE from '../assets/images/default-profile.png'

export function convertDuration(duration: any) {
    let hours = (duration / 60);
    let rhours = Math.floor(hours);
    let minutes = (hours - rhours) * 60;
    let rminutes = Math.round(minutes);
    return rhours ? rhours + "h " + (rminutes ? rminutes + "m" : '') : rminutes + "m ";
}

export const generateKey = (unique: any) => {
    // console.log(unique)
    return `${unique}_${new Date().getTime()}_${Math.random()}_${Math.random()}_${Math.random()}_${Math.random()}`;
}

export const makeUrlSlug = (name: string) => {
    return name.trim().replace(/ /g, "-").toLowerCase();
}

export const imageOnErrorHandler = (event: React.SyntheticEvent<HTMLImageElement, Event>) => {
    event.currentTarget.src = FALLBACK_IMAGE;
    // event.currentTarget.className = "error";
};
