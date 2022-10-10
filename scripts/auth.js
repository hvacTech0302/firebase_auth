// listen for auth status changes
auth.onAuthStateChanged(user => {
    // load guides and UI
    if (user) {
        db.collection('guides').onSnapshot(snapshot => {
            setupGuides(snapshot.docs)
            setupUI(user)
        }, err => console.log(err.message))
    } else {
        setupUI(null)
        setupGuides([])

    }
})

// create guide
const createForm = document.querySelector('#create-form')

createForm.addEventListener('submit', e => {
    e.preventDefault()

    const guide = {
        title: createForm.title.value,
        content: createForm.content.value
    }

    db.collection('guides').add(guide)
        .then(() => {
            // close modal and reset form
            const modal = document.querySelector('.modal-create')
            M.Modal.getInstance(modal).close()
            createForm.reset()
        })
        .catch(err => {
            console.log(err)
        })

})

// signup
const signupForm = document.querySelector('#signup-form')

signupForm.addEventListener('submit', e => {
    e.preventDefault()

    // get user info
    const email = signupForm['signup-email'].value
    const password = signupForm['signup-password'].value

    // signup the user
    auth.createUserWithEmailAndPassword(email, password)
        .then(cred => {
            return db.collection('users').doc(cred.user.uid).set({
                    bio: signupForm['signup-bio'].value
                })
                .then(() => {
                    const modal = document.querySelector('#modal-signup')
                    M.Modal.getInstance(modal).close()
                    signupForm.reset()
                })

        })
})

// log out
const logout = document.querySelector('#logout')

logout.addEventListener('click', e => {
    e.preventDefault()
    // sign user out
    auth.signOut()
        .then(() => {
            console.log('This user has logged out.')
        })
})

// log in
const loginForm = document.querySelector('#login-form')

loginForm.addEventListener('submit', e => {
    e.preventDefault()
    // get user info
    const email = loginForm['login-email'].value
    const password = loginForm['login-password'].value

    // login the user
    auth.signInWithEmailAndPassword(email, password)
        .then(() => {
            console.log('This user has logged in.')
            const modal = document.querySelector('#modal-login')
            M.Modal.getInstance(modal).close()
            loginForm.reset()
        })
})