import {gql} from "@urql/core"

const GET_WORLD = gql`
query getWorld {
    id
    getWorld {
      activeangels
      allunlocks {
        idcible
        logo
        name
        ratio
        seuil
        typeratio
        unlocked
      }
      angelbonus
      angelupgrades {
        idcible
        logo
        name
        ratio
        seuil
        unlocked
        typeratio
      }
      lastupdate
      logo
      money
      name
      score
      totalangels
      managers {
        name
        logo
        seuil
        idcible
        ratio
        typeratio
        unlocked
      }
      products {
        id
        name
        logo
        cout
        croissance
        revenu
        vitesse
        quantite
        timeleft
        managerUnlocked
        paliers {
          
        }
      }
      upgrades {
        name
        logo
        seuil
        idcible
        ratio
        typeratio
        unlocked
      }
    }
  }
  

`