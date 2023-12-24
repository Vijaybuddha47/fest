import React, { useState, useEffect } from 'react'
import Select from 'react-select';
import { useNavigate, Link } from "react-router-dom";
import makeAnimated from 'react-select/animated';
import FileUpload from '../../components/Sidebar/FileUpload';
import axios from 'axios';
import { BASE_URL } from "../../config";



//import { colourOptions } from '../data';

const Addmovie = () => {
  const [catData, setcatData] = useState([]);
  const [actData, setactData] = useState([]);
  const [dirData, setdirData] = useState([]);
  const [prodData, setprodData] = useState([]);
  const [filmkrData, setfilmkrData] = useState([]);
  const [selectedDirOptions, setSelectedDirOptions] = useState([]);
  const [selectedActOptions, setSelectedActOptions] = useState([]);
  const [selectedProOptions, setSelectedProOptions] = useState([]);
  const [selectedGenOptions, setSelectedGenOptions] = useState([]);
  const [selectedFilmkrOptions, setSelectedFilmkrOptions] = useState([]);
  const [receivedValue, setReceivedValue] = useState('');
  //const [gendata, setGenre] = useState('');
  const [banner, setBanner] = useState('');
  const [Thumbnail, setThumbnail] = useState('');
  const [title, setTitle] = useState('');//setSrtDesc
  const [short_desc, setSrtDesc] = useState('');
  const [long_desc, setLngDesc] = useState('');
  const [Rating, setRating] = useState('');
  const [Duration, setDuration] = useState('');
  const [slider, setSlider] = useState('Y');
  const [status, setStatus] = useState('A');
  const [trailer, setTrailer] = useState('');
  const history = useNavigate();

  const [titleError, settitleError] = useState('');
  const [catError, setCatError] = useState('');
  const [thumbError, setThumbError] = useState('');
  const [bannerError, setbannerError] = useState('');
  const [dirError, setDirError] = useState('');
  const [prodError, setProdError] = useState('');
  const [filmkrError, setFilmkrError] = useState('');
  const [durationError, setdurationError] = useState('');
  const [ldescError, setLdescError] = useState('');
  const [sdescError, setSdescError] = useState('');
  const [trailerError, setTrailerError] = useState('');
  const [fileError, setFileError] = useState('');
  const [actError, setActError] = useState('');
  const [ratError, setRateError] = useState('');



  const options = catData.map(catoption => ({
    value: catoption._id,
    label: catoption.genre,
  }));

  const actOptions = actData.map(actoption => ({
    value: actoption._id,
    label: actoption.actor_name,
  }));

  const dirOptions = dirData.map(diroption => ({
    value: diroption._id,
    label: diroption.director_name,
  }));

  const prodOptions = prodData.map(prodoption => ({
    value: prodoption._id,
    label: prodoption.producer_name,
  }));

  const filmkrOptions = filmkrData.map(filmkroption => ({
    value: filmkroption._id,
    label: filmkroption.name,
  }));

  useEffect(() => {
    fetchGenre();
    fetchActor();
    fetchDirector();
    fetchProducer();
    fetchFilmkr();
  }, []);
  const animatedComponents = makeAnimated();

  const fetchGenre = async () => {
    try {
      const response = await axios.get(`${BASE_URL}/view-all-genre`);
      //console.log(response.data)
      setcatData(response.data.genresList);

    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const fetchActor = async () => {
    try {
      const response = await axios.get(`${BASE_URL}/allactors`);
      //console.log(response.data.actors)
      setactData(response.data.actors);

    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const fetchDirector = async () => {
    try {
      const response = await axios.get(`${BASE_URL}/view-all-director`);
      //console.log(response.data)
      setdirData(response.data.directors);

    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const fetchProducer = async () => {
    try {
      const response = await axios.get(`${BASE_URL}/view-all-producer`);
      //console.log(response.data)
      setprodData(response.data.producers);

    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const fetchFilmkr = async () => {
    try {
      const response = await axios.get(`${BASE_URL}/view-all-filmmaker`);
      //console.log(response.data)
      setfilmkrData(response.data.filmmaker);

    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const handleSelectDirector = (selectedValues) => {
    //console.log(selectedValues)
    setSelectedDirOptions([]);
    selectedValues.map(values => {

      setSelectedDirOptions([...selectedDirOptions, values.value]);

    })

  };

  //   const handleSelectDirector = (selectedValues) => {
  //     //console.log(selectedValues)
  //     setSelectedOptions([]);
  //     selectedValues.map(values=>{

  //         //console.log(selectedValues);
  //        // let a =values.value;
  //        setSelectedOptions([...selectedOptions, values.value]);

  //         //console.log(values);
  //         //setSelectedOptions(values.value);
  //     })

  //   };

  const handleSelectProducer = (selectedValues) => {

    setSelectedProOptions([]);
    selectedValues.map(values => {

      setSelectedProOptions([...selectedProOptions, values.value]);

    })

  };

  const handleSelectActor = (selectedValues) => {

    setSelectedActOptions([]);
    selectedValues.map(values => {

      setSelectedActOptions([...selectedActOptions, values.value]);

    })

  };

  const handleFileData = (data) => {
    console.log("file", data);
    setReceivedValue(data);

  };//handletrailerData
  const handletrailerData = (data) => {
    console.log('trailer', data);
    setTrailer(data);

  };
  const handleSelectGenre = (selectedValues) => {

    setSelectedGenOptions([]);
    selectedValues.map(values => {
      setSelectedGenOptions([...selectedGenOptions, values.value]);
    })

  };

  const handleSelectFilmkr = (selectedValues) => {
    //selectedFilmkrOptions

    setSelectedFilmkrOptions([]);
    selectedValues.map(values => {
      setSelectedFilmkrOptions([...selectedFilmkrOptions, values.value]);
    })
  };

  const handleBannerChange = (e) => {
    const file = e.target.files[0];
    console.log(file);
    setBanner(file);
  };

  const handlethumbChange = (e) => {
    const file = e.target.files[0];
    //console.log(file);
    setThumbnail(file);
  };


  const AddmovieData = async (e) => {
    let flag = 0;
    //console.log(selectedGenOptions);
    //return

    if (title.length < 1) {
      settitleError('Please Enter Title');
      flag = 0
    } else {
      settitleError('');
      flag = flag + 1;
    }
    if (Thumbnail.length < 1) {
      setThumbError('Please select thumbnail');
      flag = 0
    } else {
      setThumbError('');
      flag = flag + 1;
    }
    if (banner.length < 1) {
      setbannerError('Please select Banner');
      flag = 0
    } else {
      setbannerError('');
      flag = flag + 1;
    }
    if (Duration.length < 1) {
      setdurationError('Please Enter Duration');
      flag = 0
    } else {
      setdurationError('');
      flag = flag + 1;
    }
    if (selectedActOptions.length < 1) {
      setActError('Please select Actor');
      flag = 0
    } else {
      setActError('');
      flag = flag + 1;
    }
    if (selectedDirOptions.length < 1) {
      setDirError('Please select Director');
      flag = 0
    } else {
      setDirError('');
      flag = flag + 1;
    }
    if (selectedProOptions.length < 1) {
      setProdError('Please select Producer');
      flag = 0
    } else {
      setProdError('');
      flag = flag + 1;
    }

    if (selectedFilmkrOptions.length < 1) {
      setFilmkrError('Please select Filmmaker');
      flag = 0
    } else {
      setFilmkrError('');
      flag = flag + 1;
    }
    if (selectedGenOptions.length < 1) {
      setCatError('Please select Genre');
      flag = 0
    } else {
      flag = flag + 1;
      setCatError('');

    }
    if (receivedValue.length < 1) {
      setFileError('Please select stream file');
      flag = 0
    } else {
      setFileError('');
      flag = flag + 1;
    }
    if (trailer.length < 1) {
      setTrailerError('Please select Trailer');
      flag = 0
    } else {
      setTrailerError('');
      flag = flag + 1;
    }
    if (short_desc.length < 1) {
      setSdescError('Please enter sort description');
      flag = 0
    } else {
      setSdescError('');
      flag = flag + 1;
    }
    if (long_desc.length < 1) {
      setLdescError('Please enter long description');
      flag = 0
    } else {
      setLdescError('');
      flag = flag + 1;
    }
    if (Rating.length < 1) {
      setRateError('Please Select Rating');
      flag = 0
    } else {
      setRateError('');
      flag = flag + 1;
    }
    if (flag < 14) {
      return
    }


    const formData = new FormData();
    formData.append('title', title);
    formData.append('thumbnail', Thumbnail);
    formData.append('banner', banner);
    formData.append('duration', Duration);
    formData.append('actor', selectedActOptions);
    formData.append('director', selectedDirOptions);
    formData.append('producer', selectedProOptions);
    formData.append('filmmaker', selectedFilmkrOptions);
    formData.append('rating', Rating);
    formData.append('genre', selectedGenOptions);
    //formData.append('ads_url',ads_url);
    formData.append('is_slider', slider);
    formData.append('stream_file', receivedValue);
    formData.append('trailer', trailer);
    formData.append('status', status);
    formData.append('short_description', short_desc);
    formData.append('long_description', long_desc);

    let response = await axios.post(`${BASE_URL}/add-film`, formData, {

      headers: {
        'Content-type': 'multipart/form-data',
      },
      //body: image
    });

    if (response.status === 201) {
      // Date added successfully
      history('/view-all-movies');
    }
    if (response.status != 201) {
      // Handle error
      response = await response.json();
      console.log(response);
      //setErrorMessage(response.message)
    }

  }

  // function handletitleChange(event) {
  //   const value = event.target.value;
  //   //alert(value);
  //   setTitle(value);

  //   if (value.length < 1) {
  //     settitleError('Please Enter Title');
  //   } else {
  //     settitleError('');
  //   }
  // }
  //   handleBannerChange
  //console.log(selectedDirOptions);
  return (
    <>
      <div className="content-wrapper">
        <section className="content-header">

          <div className="container-fluid">
            <div className="row mb-2">
              <div className="col-sm-6">
                <h1>Add Movie</h1>
              </div>
              <div className="col-sm-6">
                <ol className="breadcrumb float-sm-right">
                  <li className="breadcrumb-item"><Link to="/view-all-movies"><i className="fa fa-eye"></i>View All movie</Link></li>
                </ol>
              </div>
            </div>
          </div>

        </section>

        <section className="content">
          <div className="container-fluid">
            <div className="row">

              <div className="col-md-12">

                <div className="card card-primary" id="pl-container">

                  {/* <form> */}
                  <div className="card-body">
                    <div className="row">
                      <div className="col-md-6">
                        <div className="form-group">

                          <label for="categories"><span className="text-danger">*</span>Select Category</label>
                          <Select isMulti options={options}
                            closeMenuOnSelect={false} onChange={handleSelectGenre} />
                          <span className="text-danger">{catError}</span>
                        </div>

                      </div>
                      <div className="col-md-6">
                        <div className="form-group">

                          <label for="stream_title"><span className="text-danger">*</span>Movie Title</label>
                          <input type="text" name="stream_title" onChange={(e) => setTitle(e.target.value)} className="form-control" id="stream_title" maxLength="255" />
                          <span className="text-danger">{titleError}</span>
                        </div>

                      </div>

                      <div className="col-xl-6 col-lg-12 col-md-12">
                        <div className="form-group bordergaps bdgaps posterGaps">

                          <label for="thumbnail_img" ><span className="text-danger">*</span>Upload Thumbnail</label>
                          <div className="row">
                            <div className="col-md-12">
                              <img src="" accept="image/png, image/jpeg, image/jpg" className="thumb_Img" />
                              <span id="thubnail_image" className="img-text"></span>
                              <label className="input_btn">Select File<input type="file" name="thumbnail_img" className="form-control "
                                onChange={handlethumbChange} id="thumbnail_img" value="" accept="image/jpg, image/jpeg" />
                              </label> {Thumbnail.name}<br />
                              <small className="text-muted text-image"><i className="fa fa-question-circle"></i>&nbsp;Dimension: 444 x 589px (png, jpg, jpeg)</small>	<br />
                              <small className="text-muted text-image"><i className="fa fa-question-circle"></i>&nbsp;Size less than 1 MB</small>
                            </div>
                            <span className="text-danger">{thumbError}</span>
                          </div>
                        </div>
                      </div>

                      <div className="col-xl-6 col-lg-12 col-md-12">
                        <div className="form-group bordergaps bdgaps posterGaps">

                          <label for="banner" style={{ 'margin-bottom': 10 }}><span className="text-danger">*</span>Upload Banner</label>
                          <div className="row">
                            <div className="col-md-12">
                              <img src="" accept="image/png, image/jpeg, image/jpg" onerror="this.src='{{ asset('backend/images/noimg.jpg') }}';this.onerror='';" />
                              <span id="banner_image" className="img-text"></span>
                              <label className="input_btn">Select File<input type="file" name="banner" onChange={handleBannerChange} className="form-control" id="banner" value="" accept="image/png, image/jpg, image/jpeg" />

                              </label>{banner.name}<br />
                              <small className="text-muted text-image"><i className="fa fa-question-circle"></i>&nbsp;Dimension: 1920 x 1080px (png, jpg, jpeg)
                              </small><br />
                              <small className="text-muted text-image"><i className="fa fa-question-circle"></i>&nbsp;Size less than 1 MB</small>
                            </div>
                            <span className="text-danger">{bannerError}</span>
                          </div>
                        </div>
                      </div>

                      <div className="col-xl-6 col-lg-12 col-md-12">
                        <div className="form-group bordergaps posterGaps">
                          <label for="tests"><span className="text-danger">*</span>Upload Trailer</label>
                          <div className="">
                            <div className="col-md-12">
                              <FileUpload sendFileData={handletrailerData} flag={true} />
                            </div>
                          </div>
                          {/* <small className="text-muted text-image"><b>Note:</b> The trailer size should be between 5MB to 20MB</small> */}
                          <span className="text-danger">{trailerError}</span>
                        </div>

                      </div>

                      <div className="col-xl-6 col-lg-12 col-md-12">
                        <div className="form-group bordergaps posterGaps">

                          <label for="tests1"><span className="text-danger">*</span>Upload Movie</label>
                          <div className="">
                            <div className="col-md-12">
                              <FileUpload sendFileData={handleFileData} />
                            </div>
                          </div>
                          <span className="text-danger">{fileError}</span>
                        </div>
                      </div>

                      <div className="col-md-6">
                        <div className="form-group">

                          <label for="actor_name"><span className="text-danger">*</span>Select Actor</label>
                          <Select
                            closeMenuOnSelect={false} isMulti
                            options={actOptions}
                            onChange={handleSelectActor}
                          />
                          <span className="text-danger">{actError}</span>
                        </div>

                      </div>
                      <div className="col-md-6">
                        <div className="form-group">
                          <label for="director_name"><span className="text-danger">*</span>Select Director</label>
                          <Select
                            closeMenuOnSelect={false} isMulti
                            options={dirOptions}
                            onChange={handleSelectDirector}
                          />
                          <span className="text-danger">{dirError}</span>
                        </div>
                      </div>
                      <div className="col-md-6">

                        <div className="form-group">

                          <label for="producer_name"><span className="text-danger">*</span>Select Producer</label>
                          <Select
                            closeMenuOnSelect={false} isMulti
                            options={prodOptions}
                            onChange={handleSelectProducer}
                          /><span className="text-danger">{prodError}</span>
                        </div>

                      </div>

                      <div className="col-md-6">

                        <div className="form-group">

                          <label for="filmaker_name"><span className="text-danger">*</span>Select Filmmaker</label>
                          <Select
                            closeMenuOnSelect={false} isMulti
                            options={filmkrOptions}
                            onChange={handleSelectFilmkr}
                          /><span className="text-danger">{filmkrError}</span>
                        </div>

                      </div>

                      <div className="col-md-6">
                        <div className="form-group">

                          <label for="duration"><span className="text-danger">*</span>Movie Duration(In Minutes)</label>
                          <input type="text" name="duration" onChange={(e) => setDuration(e.target.value)} className="form-control" id="duration" />
                          <span className="text-danger">{durationError}</span>
                        </div>

                      </div>
                      <div className="col-md-6">
                        <div className="form-group">

                          <label for="isSlider"><span className="text-danger">*</span>Is Show in Slider?</label>
                          <select className="form-control select2" style={{ width: 100 }} name="isSlider" id="isSlider" onChange={(e) => setSlider(e.target.value)} >

                            <option value="Y" selected>Yes</option>
                            @else
                            <option value="N">No</option>
                            @endif
                            @endforeach
                          </select>
                        </div>
                        {/* <span className="text-danger">{titleError}</span> */}
                      </div>
                      <div className="col-md-6">
                        <div className="form-group">

                          <label for="status"><span className="text-danger">*</span>Status</label>
                          <select className="form-control" name="" id="" onChange={(e) => setStatus(e.target.value)} >
                            <option value="A" selected>Active</option>
                            <option value="I">Inactive</option>
                          </select>
                        </div>
                        {/* <span className="text-danger">{titleError}</span> */}
                      </div>
                      <div className="col-md-6">
                        <div className="form-group">

                          <label for="{{$strFldName}}"><span className="text-danger">*</span>Movie Rating</label>
                          <select className="form-control" name="" id="" onChange={(e) => setRating(e.target.value)} >
                            <option value="">Select Rating</option>
                            <option value="TV-Y" >TV-Y</option>
                            <option value="TV-Y7">TV-Y7</option>
                            <option value="TV-G">TV-G</option>
                            <option value="TV-PG">TV-PG</option>
                            <option value="TV-14">TV-14</option>

                          </select>
                          <span className="text-danger">{ratError}</span>
                        </div>
                      </div>
                      <div className="col-md-12">
                        <div className="form-group">

                          <label for="ads">Ads</label>
                          <input type="text" name="ads" id="ads" className="form-control" />
                        </div>
                      </div>
                      <div className="col-md-12">
                        <div className="form-group">

                          <label for="short_description"><span className="text-danger">*</span>Short Description</label>
                          <textarea name="" id="" onChange={(e) => setSrtDesc(e.target.value)} className="form-control" rows="3"></textarea>
                          <span className="text-danger">{sdescError}</span>
                        </div>

                      </div>
                      <div className="col-md-12">
                        <div className="form-group">

                          <label ><span className="text-danger">*</span>Long Description</label>
                          <textarea name="" id="" onChange={(e) => setLngDesc(e.target.value)} className="form-control" rows="5"></textarea>
                          <span className="text-danger">{ldescError}</span>
                        </div>
                      </div>
                    </div>

                  </div>
                  <div className="card-footer">

                    <button type="submit" className="btn btn-primary" onClick={AddmovieData}><i className="fa fa-paper-plane"></i> Submit</button>
                  </div>
                  {/* <input type="hidden" name="streamType" value="M" /> */}
                  {/* </form> */}
                </div>

              </div>

              <div className="col-md-6">
              </div>
            </div>
          </div>
        </section>
      </div>
    </>
  )
}

export default Addmovie;