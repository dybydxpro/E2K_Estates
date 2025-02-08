class RatingService:
    async def get_rate_tag(self, soup, value):
        try:
            if value > 3:
                return self.__get_rete(soup, value, "high")
            elif value > 2:
                return self.__get_rete(soup, value, "medium")
            else:
                return self.__get_rete(soup, value, "low")
        except Exception as err:
            raise err

    def __get_rete(self, soup, value, mod):
        star_container_tag = soup.new_tag('div')
        star_container_tag.attrs['class'] = 'flex justify-center'

        str_tag_1 = soup.new_tag('span')
        if value >= 1:
            str_tag_1.attrs['class'] = f"fa-star {mod}"
            str_tag_1.string = '★'
        else:
            str_tag_1.attrs['class'] = 'fa-star'
            str_tag_1.string = '★'
        star_container_tag.append(str_tag_1)

        str_tag_2 = soup.new_tag('span')
        if value >= 2:
            str_tag_2.attrs['class'] = f"fa-star {mod}"
            str_tag_2.string = '★'
        else:
            str_tag_2.attrs['class'] = 'fa-star'
            str_tag_2.string = '★'
        star_container_tag.append(str_tag_2)

        str_tag_3 = soup.new_tag('span')
        if value >= 3:
            str_tag_3.attrs['class'] = f"fa-star {mod}"
            str_tag_3.string = '★'
        else:
            str_tag_3.attrs['class'] = 'fa-star'
            str_tag_3.string = '★'
        star_container_tag.append(str_tag_3)

        str_tag_4 = soup.new_tag('span')
        if value >= 4:
            str_tag_4.attrs['class'] = f"fa-star {mod}"
            str_tag_4.string = '★'
        else:
            str_tag_4.attrs['class'] = 'fa-star'
            str_tag_4.string = '★'
        star_container_tag.append(str_tag_4)

        str_tag_5 = soup.new_tag('span')
        if value >= 5:
            str_tag_5.attrs['class'] = f"fa-star {mod}"
            str_tag_5.string = '★'
        else:
            str_tag_5.attrs['class'] = 'fa-star'
            str_tag_5.string = '★'
        star_container_tag.append(str_tag_5)

        return star_container_tag