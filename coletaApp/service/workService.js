import firestore from '@react-native-firebase/firestore';

export const saveWork = (trabalho, chave) => {

    if (chave === "") {
        return new Promise((resolve, reject) => {
            firestore().collection("work")
                .add(trabalho)
                .then(result => resolve(result.id))
                .catch(erro => reject(erro))
        })
    } else {
        return new Promise((resolve, reject) => {
            db.collection("work")
                .doc(chave)
                .update(trabalho)
                .then(() => resolve())
                .catch(erro => reject(erro))
        })
    }
}

export const deleteWork = (work) => {
    return new Promise((resolve, reject) => {
        db.collection("work")
            .doc(work.key)
            .delete()
            .then(() => resolve())
            .catch(erro => reject(erro))
    })
}

export const getWorks = () => {
    return new Promise((resolve, reject) => {
        firestore().collection("work")
            .get()
            .then(snapchot => {
                let worksLista = []
                snapchot.forEach((item) => {
                    //const { title, description } = item.data()
                    worksLista.push({
                        ...item.data(),
                        key: item.id
                    })
                })
                resolve(worksLista)
            })
            .catch(erro => reject(erro))
    })
}