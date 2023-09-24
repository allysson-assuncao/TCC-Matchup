package com.matchup.dto;

import java.util.List;

public class RequestDto {
    private List<SearchRequestDto> searchRequestDto;

    private GlobalOperator globalOperator;

    public enum GlobalOperator{
        OR, AND
    }

    public List<SearchRequestDto> getSearchRequestDto() {
        return searchRequestDto;
    }

    public void setSearchRequestDto(List<SearchRequestDto> searchRequestDto) {
        this.searchRequestDto = searchRequestDto;
    }

    public GlobalOperator getGlobalOperator() {
        return globalOperator;
    }

    public void setGlobalOperator(GlobalOperator globalOperator) {
        this.globalOperator = globalOperator;
    }
}
