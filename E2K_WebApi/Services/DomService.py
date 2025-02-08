from bs4 import BeautifulSoup

from E2K_WebApi.Services.RatingService import RatingService

class DomService:
    def __init__(self):
        self.ratingService = RatingService()

    async def update_dom(self, doc):
        soup = BeautifulSoup(doc, 'html.parser')

        for anchor_tag in soup.find_all('a'):
            anchor_tag["target"] = "_blank"

        for td_tag in soup.find_all('td'):
            value = td_tag.string

            if value == '0' or value == 0:
                td_tag.clear()
                td_tag.append(await self.ratingService.get_rate_tag(soup, 0))
            elif value == '1' or value == 1:
                td_tag.clear()
                td_tag.append(await self.ratingService.get_rate_tag(soup, 1))
            elif value == '2' or value == 2:
                td_tag.clear()
                td_tag.append(await self.ratingService.get_rate_tag(soup, 2))
            elif value == '3' or value == 3:
                td_tag.clear()
                td_tag.append(await self.ratingService.get_rate_tag(soup, 3))
            elif value == '4' or value == 4:
                td_tag.clear()
                td_tag.append(await self.ratingService.get_rate_tag(soup, 4))
            elif value == '5' or value == 5:
                td_tag.clear()
                td_tag.append(await self.ratingService.get_rate_tag(soup, 5))
        return soup