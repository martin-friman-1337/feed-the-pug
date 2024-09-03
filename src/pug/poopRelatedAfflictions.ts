export interface IPoopRelatedAffliction {
    playerId: number,
    duration: number, //just gunna round up to a whole number. No reason to mess around with javascripts innacurate floating point math.
    affliction: Afflictions
}

enum Afflictions {
    POOMIES = 0,
    TRANCEND_PUGHOOD_BECOME_DEATH_INCARNATE = 1
}