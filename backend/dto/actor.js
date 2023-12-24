class ActorDTO{
    constructor (actor)
    {
        this._id = actor._id;
        this.actor_name = actor.actor_name;
        this.social_link = actor.social_link;
    }
}

module.exports = ActorDTO;