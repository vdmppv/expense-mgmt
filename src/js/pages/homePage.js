let HomePage = {
    render: async () => {
        let view =  /*html*/`
        <div class="start-img"></div>
        <h2 class="welcome-text">Welcome to Expenser</h2>
        `
        return view;
    },
    after_render: async () => {
    }
}
export default HomePage;
