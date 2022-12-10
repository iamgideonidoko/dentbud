export interface ConverseRasa {
  id: string;
  name: string;
  email: string;
  text: string;
}

export interface CallRasaRes {
  recipient_id: string;
  text: string;
}

export interface IGoogleBookAPIResponse {
  kind: string;
  totalItems: number;
  items: Array<{
    kind: string;
    id: string;
    etag: string;
    selfLink: string;
    volumeInfo: {
      title: string;
      authors: string[];
      publisher: string;
      publishedDate: string;
      description: string;
      readingModes: {
        text: string;
        image: string;
      };
      maturityRating: string;
      allowAnonLogging: boolean;
      contentVersion: string;
      panelizationSummary: {
        containsEpubBubbles: boolean;
        containsImageBubbles: boolean;
      };
      imageLinks: {
        smallThumbnail: string;
        thumbnail: string;
      };
      previewLink: string;
      infoLink: string;
      canonicalVolumeLink: string;
    };
    saleInfo: {
      country: string;
    };
    accessInfo: {
      country: string;
      epub: {
        isAvailable: boolean;
      };
      pdf: {
        isAvailable: boolean;
      };
      accessViewStatus: string;
    };
    searchInfo: {
      textSnippet: string;
    };
  }>;
}
