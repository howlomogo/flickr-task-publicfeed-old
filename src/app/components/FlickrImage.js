import React, {Component} from 'react';

class FlickrImage extends Component {
  constructor() {
    super();
    this.getAuthor = this.getAuthor.bind(this);
    this.getAuthorLink = this.getAuthorLink.bind(this);
    this.getDescription = this.getDescription.bind(this);
  }

  // The public data recieved needs to be modified as shown below in order to display correctly

  getAuthor(author) {
    // Remove email from returned author - only return users name
    const start = author.indexOf('"');
    const name = author.slice(start + 1, author.length -2);
    return name;
  }

  getAuthorLink(link) {
    // Remove photo id from end of link and link to authors page
    const authorLink = link.split('/').slice(4,5);
    return 'https://www.flickr.com/photos/' + authorLink;
  }

  // This function will return a description of the image, however I have commented it out as the returned JSON flickr api data isn't consistant and there is no reliable way of getting the description based off of this, Please see updated version of app where getInfo is used in order to retrieve description
  getDescription(descriptionObj) {
    // Uncomment to view inconsistencies
    // const descStart = descriptionObj.lastIndexOf('<p>');
    // const description = descriptionObj.slice(descStart + 3, descriptionObj.length - 4);

    const description = 'A dummy description of the Flickr image, please view FlickrImage.js to see reasoning for using this here.'
    return description;
  }


  render() {
    const tags = this.props.photo.tags.split(' ');
    const tagList = tags.map((tag) => {
      return(
        <div onClick={() => this.props.getFlickrImages(tag, true)} className="photo--tag" key={tag}>{tag}</div>
      )
    })

    return(
      <div className="photo--container">
        <img className="photo--img" src={this.props.photo.media.m} />
        <div className="photo--content-container">
          <a className="photo--font-title mb-2" href={this.props.photo.link} target='_blank'>
            {this.props.photo.title}
          </a>

          <a className="photo--font-author" href={this.getAuthorLink(this.props.photo.link)} target='_blank'>
            <span className="font-weight-bold">By: </span>
            {this.getAuthor(this.props.photo.author)}
          </a>

          <p className="photo--font-description">
            <span className="font-weight-bold">Description: </span>
            {this.getDescription(this.props.photo.description)}
          </p>
          <hr />
          <p className="photo--font-tag font-weight-bold">
            Tags:
          </p>
          <div className="photo--tag-container">
            {tagList}
          </div>
        </div>
      </div>
    )
  }
}


export default FlickrImage;
