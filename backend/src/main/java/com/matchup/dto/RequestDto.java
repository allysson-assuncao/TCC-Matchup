package com.matchup.dto;

import lombok.Getter;
import lombok.Setter;
import org.springframework.data.domain.Sort;

import java.util.List;

@Getter
@Setter
public class RequestDto {

/*    private final String NAME = "name";
    private final String LOWEST_PRICE = "lowestPrice";
    private final String HIGHEST_PRICE = "highestPrice";*/


    private List<SearchRequestDto> searchRequestDtos;

    private GlobalOperator globalOperator;

    /*private String orderBy;

    private Sort.Direction direction;*/

    public enum GlobalOperator{
        OR, AND
    }

}
