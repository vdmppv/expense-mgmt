let NotFoundPage = {
    render: async () => {
        let view =  /*html*/`
            <section>
                <h1> Error 404: Not found </h1>
            </section>
        `
        return view;
    },
    after_render: async () => {
    }
}
export default NotFoundPage;
