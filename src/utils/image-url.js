// Returns a valid image url or an empty string (prevents null value error)

export const getImageUrl = ( image, preferred_size ) => {
  //console.log("getImageUrl image", image)

  if ( image && image.formats ) {
    if (preferred_size === "large" && image.formats.large && image.formats.large.url && image.formats.large.url.substring(0, 9) !== "/uploads/") {
      return image.formats.large.url
    }

    if (preferred_size === "medium" && image.formats.medium && image.formats.medium.url && image.formats.medium.url.substring(0, 9) !== "/uploads/") {
        return image.formats.medium.url
    }

    if (preferred_size === "small" && image.formats.small && image.formats.small.url && image.formats.small.url.substring(0, 9) !== "/uploads/") {
      return image.formats.small.url
    }

    if (preferred_size === "thumbnail" && image.formats.thumbnail && image.formats.thumbnail.url && image.formats.thumbnail.url.substring(0, 9) !== "/uploads/") {
      return image.formats.thumbnail.url
    }

    if (image.formats.large && image.formats.large.url && image.formats.large.url.substring(0, 9) !== "/uploads/") {
      return image.formats.large.url
    }

    if (image.formats.medium && image.formats.medium.url && image.formats.medium.url.substring(0, 9) !== "/uploads/") {
      return image.formats.medium.url
    }

    if (image.formats.small && image.formats.small.url && image.formats.small.url.substring(0, 9) !== "/uploads/") {
      return image.formats.small.url
    }

    if (image.formats.thumbnail && image.formats.thumbnail.url && image.formats.thumbnail.url.substring(0, 9) !== "/uploads/") {
      return image.formats.thumbnail.url
    }
  }

  if (image && image.localFile && image.localFile.publicURL) {
    return image.localFile.publicURL
  }

  if (image && image.url ) {
    return image.url
  } else { return "" }
}
