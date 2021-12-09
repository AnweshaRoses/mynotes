import Notes from './Notes'
export const Home = () => {

    return (
        <div >
            <div className="container my-4">
                <h2>Add a Note here</h2>
                <form action="">
                    <div class="mb-2">
                        <label for="exampleFormControlInput1" class="form-label"></label>
                        <input type="Text" class="form-control" id="exampleFormControlInput1" placeholder="Enter Title" />
                    </div>
                    <div class="mb-2">
                        <label for="exampleFormControlTextarea1" class="form-label"></label>
                        <textarea class="form-control" id="exampleFormControlTextarea1" rows="14" placeholder="Start Writing your note"></textarea>
                    </div>
                    <div class="col-auto">
                        <button type="submit" class="btn btn-dark my-3">Submit</button>
                    </div>

                </form>
            </div>
            <Notes/>
        </div>
    )
}
